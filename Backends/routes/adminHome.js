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
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage, deleteFromCloudinary } = require("../utils/cloudinary");
const AdminHome = require("../models/AdminHome");

const upload = multer({ storage });

// GET: Fetch admin data
router.get("/", async (req, res) => {
  try {
    let data = await AdminHome.findOne();
    if (!data) {
      data = await AdminHome.create({
        name: "Your Name",
        bio: "Professional bio",
        roles: ["Developer"],
        imageUrl: "",
        cvLink: ""
      });
    }
    res.json(data);
  } catch (err) {
    console.error("GET error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST: Update admin data + image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, bio, roles, cvLink } = req.body;
    const rolesArray = JSON.parse(roles);

    let data = await AdminHome.findOne();

    if (!data) {
      data = new AdminHome({
        name,
        bio,
        roles: rolesArray,
        imageUrl: req.file?.path || "",
        cvLink,
      });
    } else {
      if (req.file && data.imageUrl) {
        await deleteFromCloudinary(data.imageUrl);
      }
      data.name = name;
      data.bio = bio;
      data.roles = rolesArray;
      data.cvLink = cvLink;
      if (req.file) data.imageUrl = req.file.path;
    }

    await data.save();
    res.json({ success: true, message: "Admin updated", data });
  } catch (err) {
    console.error("POST error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
