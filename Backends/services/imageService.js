const { 
  uploadToCloudinary, 
  deleteFromCloudinary, 
  getOptimizedImageUrl,
  uploadMultipleImages 
} = require('../config/cloudinary');

class ImageService {
  // Upload single image with specific folder and transformations
  static async uploadSingle(fileBuffer, options = {}) {
    try {
      const defaultOptions = {
        folder: 'portfolio-images',
        quality: 'auto',
        format: 'auto'
      };
      
      const uploadOptions = { ...defaultOptions, ...options };
      const result = await uploadToCloudinary(fileBuffer, uploadOptions);
      
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error('Image upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Upload multiple images
  static async uploadMultiple(files, folder = 'portfolio-images') {
    try {
      const results = await uploadMultipleImages(files, folder);
      return {
        success: true,
        data: results
      };
    } catch (error) {
      console.error('Multiple images upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Delete image by public ID
  static async delete(publicId) {
    try {
      const result = await deleteFromCloudinary(publicId);
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error('Image deletion error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Replace existing image (upload new and delete old)
  static async replace(fileBuffer, oldPublicId, options = {}) {
    try {
      // Upload new image first
      const uploadResult = await this.uploadSingle(fileBuffer, options);
      
      if (!uploadResult.success) {
        throw new Error('Failed to upload new image');
      }

      // Delete old image if upload was successful
      if (oldPublicId) {
        await this.delete(oldPublicId);
      }

      return uploadResult;
    } catch (error) {
      console.error('Image replacement error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get optimized image URL with transformations
  static getOptimizedUrl(publicId, transformations = []) {
    try {
      return getOptimizedImageUrl(publicId, { transformations });
    } catch (error) {
      console.error('URL generation error:', error);
      return null;
    }
  }

  // Generate responsive image URLs
  static generateResponsiveUrls(publicId) {
    const breakpoints = [
      { name: 'mobile', width: 480 },
      { name: 'tablet', width: 768 },
      { name: 'desktop', width: 1200 },
      { name: 'large', width: 1920 }
    ];

    return breakpoints.reduce((urls, bp) => {
      urls[bp.name] = this.getOptimizedUrl(publicId, [
        { width: bp.width, crop: 'scale' },
        { quality: 'auto' },
        { fetch_format: 'auto' }
      ]);
      return urls;
    }, {});
  }

  // Validate image file
  static validateImage(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.mimetype)) {
      return {
        valid: false,
        error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File too large. Maximum size is 5MB.'
      };
    }

    return { valid: true };
  }

  // Process image for different use cases
  static getTransformationsFor(type) {
    const transformations = {
      profile: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ],
      project: [
        { width: 1200, height: 800, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ],
      thumbnail: [
        { width: 300, height: 200, crop: 'fill' },
        { quality: 'auto:eco' },
        { fetch_format: 'auto' }
      ],
      gallery: [
        { width: 800, height: 600, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ]
    };

    return transformations[type] || transformations.project;
  }
}

module.exports = ImageService;