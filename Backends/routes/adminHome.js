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
const multer = require('multer');
const path = require('path');
const AdminHome = require('../Models/AdminHome');

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// GET Admin Home
router.get('/', async (req, res) => {
  try {
    let data = await AdminHome.findOne();

    if (!data) {
      data = await AdminHome.create({
        name: 'Default Name',
        bio: 'Default bio',
        roles: ['Developer'],
        imageUrl: '',
        cvLink: ''
      });
    }

    // ✅ Construct full URL for image
    const fullUrl = req.protocol + "://" + req.get("host");
    const updatedData = {
      ...data.toObject(),
      imageUrl: data.imageUrl ? `${fullUrl}/${data.imageUrl.replace(/\\/g, "/")}` : ''
    };

    res.json(updatedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// POST Admin Home Update
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const rolesArray = JSON.parse(req.body.roles);

    let data = await AdminHome.findOne();
    const imagePath = req.file ? `uploads/${req.file.filename}` : data?.imageUrl;

    if (!data) {
      data = new AdminHome({
        name: req.body.name,
        bio: req.body.bio,
        roles: rolesArray,
        imageUrl: imagePath,
        cvLink: req.body.cvLink
      });
    } else {
      data.name = req.body.name;
      data.bio = req.body.bio;
      data.roles = rolesArray;
      data.cvLink = req.body.cvLink;
      if (req.file) data.imageUrl = imagePath;
    }

    await data.save();

    const fullUrl = req.protocol + "://" + req.get("host");
    const updatedData = {
      ...data.toObject(),
      imageUrl: data.imageUrl ? `${fullUrl}/${data.imageUrl.replace(/\\/g, "/")}` : ''
    };

    res.json({ msg: 'Admin Home updated successfully', data: updatedData });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;

