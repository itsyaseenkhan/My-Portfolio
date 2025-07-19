const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image to Cloudinary with options
const uploadToCloudinary = async (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const defaultOptions = {
      folder: options.folder || "portfolio-images",
      quality: options.quality || "auto",
      format: options.format || "auto",
      transformation: options.transformation || [
        { width: 1200, height: 800, crop: "limit" },
        { quality: "auto:good" }
      ]
    };

    const uploadOptions = { ...defaultOptions, ...options };

    const stream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes
          });
        }
      }
    );
    stream.end(fileBuffer);
  });
};

// Delete image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
};

// Generate optimized image URL
const getOptimizedImageUrl = (publicId, options = {}) => {
  const defaultTransformations = [
    { quality: "auto" },
    { fetch_format: "auto" }
  ];
  
  const transformations = options.transformations || defaultTransformations;
  
  return cloudinary.url(publicId, {
    transformation: transformations,
    secure: true
  });
};

// Upload multiple images
const uploadMultipleImages = async (files, folder = "portfolio-images") => {
  try {
    const uploadPromises = files.map(file => 
      uploadToCloudinary(file.buffer, { folder })
    );
    
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Multiple upload error:', error);
    throw error;
  }
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  deleteFromCloudinary,
  getOptimizedImageUrl,
  uploadMultipleImages
};