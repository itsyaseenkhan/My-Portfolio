const mongoose = require("mongoose");

const AdminHomeSchema = new mongoose.Schema({
  name: String,
  roles: [String],
  bio: String,
  imageUrl: String,
  cvLink: String
});

module.exports = mongoose.model("AdminHome", AdminHomeSchema);
