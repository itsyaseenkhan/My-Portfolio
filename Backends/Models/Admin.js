const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: "" }, // ✅ NEW
  resetToken: String,
  resetTokenExpiry: Date
});

module.exports = mongoose.model("Admin", adminSchema);
