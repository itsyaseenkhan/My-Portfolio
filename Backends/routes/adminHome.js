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
const express = require('express');
const router = express.Router();
const AdminHome = require('../Models/AdminHome');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

// Upload to Cloudinary helper
const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'portfolio-admin',
        transformation: { width: 800, height: 800, crop: 'limit' }
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

// GET Admin Home Data
router.get('/', verifyToken, async (req, res) => {
  try {
    let data = await AdminHome.findOne().sort({ _id: -1 });
    if (!data) {
      data = await AdminHome.create({
        name: 'Your Name',
        bio: 'Professional bio here',
        roles: ['Full Stack Developer'],
        imageUrl: '',
        cvLink: '#'
      });
    }
    res.json(data);
  } catch (err) {
    console.error('Error fetching admin home data:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Update Admin Home Data
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { name, bio, roles, cvLink } = req.body;
    
    if (!name || !bio || !roles || !cvLink) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    let imageUrl;
    if (req.file) {
      try {
        imageUrl = await uploadToCloudinary(req.file.buffer);
      } catch (uploadErr) {
        console.error('Cloudinary upload error:', uploadErr);
        return res.status(500).json({ msg: 'Image upload failed' });
      }
    }

    let data = await AdminHome.findOne().sort({ _id: -1 });
    
    if (!data) {
      data = new AdminHome({
        name,
        bio,
        roles: JSON.parse(roles),
        cvLink,
        imageUrl: imageUrl || ''
      });
    } else {
      // Delete old image if new one is uploaded
      if (imageUrl && data.imageUrl) {
        try {
          const publicId = data.imageUrl.split('/').slice(-2).join('/').split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error('Error deleting old image:', err);
        }
      }
      
      data.name = name;
      data.bio = bio;
      data.roles = JSON.parse(roles);
      data.cvLink = cvLink;
      if (imageUrl) data.imageUrl = imageUrl;
    }

    await data.save();
    res.json({ 
      msg: 'Data updated successfully',
      data: {
        name: data.name,
        bio: data.bio,
        roles: data.roles,
        imageUrl: data.imageUrl,
        cvLink: data.cvLink
      }
    });
  } catch (err) {
    console.error('Error updating admin home data:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;