// ==== routes/Adminabout.js ====
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const About = require("../Models/About");

// Multer Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Create About
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, title, description } = req.body;
    const image = req.file?.filename || "";

    const about = new About({ name, title, description, image });
    await about.save();
    res.json({ message: "About created", data: about });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get All Abouts
router.get("/", async (req, res) => {
  try {
    const abouts = await About.find();
    res.json(abouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update About
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, title, description } = req.body;
    const updateData = { name, title, description };
    if (req.file) updateData.image = req.file.filename;

    const updated = await About.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ message: "About updated", data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update about" });
  }
});

// Delete About
router.delete("/:id", async (req, res) => {
  try {
    await About.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete about" });
  }
});

module.exports = router;

// // @ -0,0 +1,57 @@
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const About = require("../Models/About");

// // Multer config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });
// const upload = multer({ storage: storage });

// // Create About Profile
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     const { name, title, description } = req.body;
//     const imagePath = req.file ? req.file.path : "";

//     const about = new About({
//       name,
//       title,
//       description,
//       image: imagePath
//     });

//     await about.save();
//     res.json({ message: "About profile created", data: about });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Get All About Profiles
// router.get("/", async (req, res) => {
//   try {
//     const abouts = await About.find();
//     res.json(abouts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     await About.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// module.exports = router;
