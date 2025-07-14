const express = require("express");
const router = express.Router();
const multer = require("multer");
const About = require("../Models/About");
const path = require("path");

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// CREATE About Profile
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, title, description } = req.body;
    const imagePath = req.file ? req.file.filename : "";

    const about = new About({
      name,
      title,
      description,
      image: imagePath
    });

    await about.save();
    res.json({ message: "About profile created", data: about });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET All About Profiles
router.get("/", async (req, res) => {
  try {
    const abouts = await About.find();
    res.json(abouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE About Profile
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, title, description } = req.body;
    const updateData = { name, title, description };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedAbout = await About.findByIdAndUpdate(req.params.id, updateData, {
      new: true
    });

    res.json({ message: "About updated", data: updatedAbout });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update about" });
  }
});

// DELETE About Profile
router.delete("/:id", async (req, res) => {
  try {
    await About.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
