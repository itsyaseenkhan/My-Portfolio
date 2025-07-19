require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Verify required environment variables
const requiredEnvVars = [
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  console.error('Please make sure to set up your .env file with Cloudinary credentials');
}

// Cloudinary config with enhanced error handling
let cloudinaryConfig;
try {
  cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  };
  
  cloudinary.config(cloudinaryConfig);
  console.log('✅ Cloudinary configured successfully');
} catch (err) {
  console.error('❌ Error configuring Cloudinary:', err.message);
  throw new Error('Failed to configure Cloudinary. Please check your environment variables.');
}

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: "Portfolio",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [
        { width: 1200, height: 1200, crop: "limit", quality: "auto" },
        { fetch_format: "auto" }
      ],
      resource_type: "auto",
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    };
  },
});

// Function to delete an image from Cloudinary
const deleteFromCloudinary = async (imageUrl) => {
  if (!imageUrl) return { success: true, message: 'No image URL provided' };
  
  try {
    // Extract public ID from URL
    const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];
    
    if (!publicId) {
      console.warn('⚠️ Could not extract public ID from URL:', imageUrl);
      return { success: false, message: 'Invalid image URL' };
    }
    
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      console.log(`✅ Deleted image: ${publicId}`);
      return { success: true, message: 'Image deleted successfully' };
    } else {
      console.warn('⚠️ Failed to delete image:', result);
      return { success: false, message: result.result };
    }
  } catch (err) {
    console.error('❌ Error deleting from Cloudinary:', err.message);
    return { 
      success: false, 
      message: 'Failed to delete image',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    };
  }
};

// Function to upload an image to Cloudinary
const uploadToCloudinary = async (fileBuffer, folder = 'Portfolio') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: 'auto',
        transformation: [
          { width: 1200, height: 1200, crop: 'limit', quality: 'auto' },
          { fetch_format: 'auto' }
        ]
      },
      (error, result) => {
        if (error) {
          console.error('❌ Cloudinary upload error:', error);
          reject(error);
        } else {
          console.log('✅ Uploaded to Cloudinary:', result.secure_url);
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            bytes: result.bytes
          });
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
};

module.exports = { 
  storage, 
  deleteFromCloudinary, 
  uploadToCloudinary,
  cloudinary // Exporting cloudinary instance for direct use if needed
};
