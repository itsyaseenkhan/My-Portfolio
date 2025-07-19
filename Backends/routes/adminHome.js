const express = require('express');
const router = express.Router();
const multer = require('multer');
const AdminHome = require('../Models/AdminHome');
const { storage, deleteFromCloudinary, uploadToCloudinary } = require('../utils/cloudinary');

// Configure multer for memory storage (we'll handle the upload to Cloudinary manually)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Helper function to handle errors
const handleError = (res, status, message, error = null) => {
  console.error(`[${new Date().toISOString()}] Error: ${message}`, error || '');
  return res.status(status).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && error ? { error: error.message } : {})
  });
};

// Default profile image URL (can be replaced with your own default image URL)
const DEFAULT_PROFILE_IMAGE = 'https://res.cloudinary.com/demo/image/upload/v1627580143/default-avatar.png';

router.get('/', async (req, res) => {
  try {
    let data = await AdminHome.findOne();
    
    // If no data exists, create default data
    if (!data) {
      data = await AdminHome.create({
        name: 'Your Name',
        bio: 'A short bio about yourself',
        roles: ['Developer'],
        imageUrl: DEFAULT_PROFILE_IMAGE,
        cvLink: ''
      });
    } 
    // If imageUrl is empty or not set, use the default image
    else if (!data.imageUrl) {
      data.imageUrl = DEFAULT_PROFILE_IMAGE;
      await data.save();
    }

    res.json({
      success: true,
      data: {
        ...data._doc,
        // Ensure we always return a valid image URL
        imageUrl: data.imageUrl || DEFAULT_PROFILE_IMAGE
      }
    });
  } catch (err) {
    console.error('Error in GET /adminhome:', err);
    handleError(res, 500, 'Failed to fetch profile data', err);
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, bio, roles, cvLink } = req.body;
    
    // Validate required fields
    if (!name || !bio) {
      return handleError(res, 400, 'Name and bio are required');
    }

    // Parse roles if provided
    let rolesArray = [];
    try {
      rolesArray = roles ? JSON.parse(roles) : [];
    } catch (err) {
      console.warn('Invalid roles format, using empty array');
    }

    // Find existing data
    let data = await AdminHome.findOne();
    
    // Handle image upload if file is provided
    let imageUrl = data?.imageUrl || '';
    if (req.file) {
      try {
        // Delete old image if exists
        if (data?.imageUrl) {
          await deleteFromCloudinary(data.imageUrl);
        }
        
        // Upload new image to Cloudinary
        const result = await uploadToCloudinary(req.file.buffer, 'portfolio/profile');
        imageUrl = result.url;
      } catch (err) {
        console.error('Image upload error:', err);
        return handleError(res, 500, 'Failed to upload image', err);
      }
    }

    // Prepare update data
    const updateData = {
      name,
      bio,
      roles: rolesArray,
      cvLink: cvLink || '',
      ...(req.file && { imageUrl }) // Only update imageUrl if a new file was uploaded
    };

    // Create or update the document
    if (!data) {
      data = new AdminHome(updateData);
    } else {
      Object.assign(data, updateData);
    }

    // Save to database
    const savedData = await data.save();
    
    // Return success response
    res.json({
      success: true,
      message: 'Admin Home section updated successfully',
      data: savedData
    });
    
  } catch (err) {
    console.error('Error in POST /adminhome:', err);
    handleError(res, 500, 'Internal server error', err);
  }
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const AdminHome = require('../Models/AdminHome');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// router.get('/', async (req, res) => {
//   try {
//     let data = await AdminHome.findOne();
//     if (!data) {
//       data = await AdminHome.create({
//         name: 'Default Name',
//         bio: 'Default bio',
//         roles: ['Developer'],
//         imageUrl: '',
//         cvLink: ''
//       });
//     }
//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error', error: err.message });
//   }
// });

// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);

//     const rolesArray = JSON.parse(req.body.roles);

//     let data = await AdminHome.findOne();
//     if (!data) {
//       data = new AdminHome({
//         name: req.body.name,
//         bio: req.body.bio,
//         roles: rolesArray,
//         imageUrl: req.file ? req.file.path : '',
//         cvLink: req.body.cvLink
//       });
//     } else {
//       data.name = req.body.name;
//       data.bio = req.body.bio;
//       data.roles = rolesArray;
//       data.cvLink = req.body.cvLink;
//       if (req.file) data.imageUrl = req.file.path;
//     }

//     await data.save();
//     res.json({ msg: 'Admin Home section updated successfully', data });
//   } catch (err) {
//     console.error("Server error:", err);
//     res.status(500).json({ msg: 'Server error', error: err.message });
//   }
// });

// module.exports = router;
