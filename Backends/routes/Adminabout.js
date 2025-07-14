const express = require("express");
const router = express.Router();
const multer = require("multer");
const About = require("../Models/About");
const path = require("path");
const fs = require("fs");

// Multer Config
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

// POST - Create About
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, title, description } = req.body;
    const image = req.file?.filename;

    const about = new About({ name, title, description, image });
    await about.save();

    res.json({ message: "About created", data: about });
  } catch (err) {
    res.status(500).json({ error: "Failed to create about" });
  }
});

// GET - All About Data
router.get("/", async (req, res) => {
  try {
    const abouts = await About.find();
    res.json(abouts);
  } catch (err) {
    res.status(500).json({ error: "Failed to get abouts" });
  }
});

// PUT - Update About
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, title, description } = req.body;
    const updateData = { name, title, description };
    if (req.file) updateData.image = req.file.filename;

    const updated = await About.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ message: "Updated", data: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update about" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await About.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete about" });
  }
});

module.exports = router;
