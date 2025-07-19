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
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio-admin',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }]
  }
});

const upload = multer({ storage });

// GET Admin Home Data
router.get('/', async (req, res) => {
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
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, bio, roles, cvLink } = req.body;
    const rolesArray = JSON.parse(roles);

    let data = await AdminHome.findOne().sort({ _id: -1 });
    
    if (!data) {
      // Create new if doesn't exist
      data = new AdminHome({
        name,
        bio,
        roles: rolesArray,
        imageUrl: req.file ? req.file.path : '',
        cvLink
      });
    } else {
      // Update existing
      data.name = name;
      data.bio = bio;
      data.roles = rolesArray;
      data.cvLink = cvLink;

      // If new image uploaded
      if (req.file) {
        // Delete old image from Cloudinary if exists
        if (data.imageUrl) {
          try {
            const publicId = data.imageUrl.split('/').slice(-2).join('/').split('.')[0];
            await cloudinary.uploader.destroy(publicId);
          } catch (err) {
            console.error('Error deleting old image:', err);
          }
        }
        data.imageUrl = req.file.path;
      }
    }

    await data.save();
    res.json({ 
      msg: 'Admin Home data updated successfully',
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