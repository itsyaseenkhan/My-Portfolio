const multer = require('multer');
const { uploadToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// Memory storage for multer (we'll upload to Cloudinary)
const storage = multer.memoryStorage();

// File filter for images only
const fileFilter = (req, file, cb) => {
  // Check if file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// Single image upload middleware
const uploadSingle = (fieldName = 'image') => {
  return upload.single(fieldName);
};

// Multiple images upload middleware
const uploadMultiple = (fieldName = 'images', maxCount = 5) => {
  return upload.array(fieldName, maxCount);
};

// Middleware to handle Cloudinary upload after multer
const handleCloudinaryUpload = (folder = 'portfolio-images') => {
  return async (req, res, next) => {
    try {
      if (req.file) {
        // Single file upload
        const uploadResult = await uploadToCloudinary(req.file.buffer, { folder });
        req.cloudinaryResult = uploadResult;
      } else if (req.files && req.files.length > 0) {
        // Multiple files upload
        const uploadPromises = req.files.map(file => 
          uploadToCloudinary(file.buffer, { folder })
        );
        const uploadResults = await Promise.all(uploadPromises);
        req.cloudinaryResults = uploadResults;
      }
      next();
    } catch (error) {
      console.error('Cloudinary upload middleware error:', error);
      res.status(500).json({ 
        error: 'Image upload failed', 
        details: error.message 
      });
    }
  };
};

// Middleware to delete old image when updating
const deleteOldImage = async (req, res, next) => {
  try {
    if (req.body.oldImagePublicId) {
      await deleteFromCloudinary(req.body.oldImagePublicId);
    }
    next();
  } catch (error) {
    console.error('Error deleting old image:', error);
    // Continue even if deletion fails
    next();
  }
};

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files. Maximum is 5 files.' });
    }
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};

module.exports = {
  uploadSingle,
  uploadMultiple,
  handleCloudinaryUpload,
  deleteOldImage,
  handleMulterError
};