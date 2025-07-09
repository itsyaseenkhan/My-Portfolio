const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institute: { type: String, required: true },
  board: { type: String, required: true },       // ✅ New field
  year: { type: String, required: true },
  grade: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Education", educationSchema);
