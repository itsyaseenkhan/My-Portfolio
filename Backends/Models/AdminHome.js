// const mongoose = require('mongoose');

// const adminHomeSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   bio: {
//     type: String,
//     required: true
//   },
//   roles: {
//     type: [String],
//     required: true
//   },
//   imageUrl: {
//     type: String,
//     required: true
//   },
//   cvLink: {
//     type: String,
//     required: true
//   }
// });

// module.exports = mongoose.model('AdminHome', adminHomeSchema);
const mongoose = require("mongoose");

const AdminHomeSchema = new mongoose.Schema({
  name: String,
  roles: [String],
  bio: String,
  imageUrl: String,
  cvLink: String
});

module.exports = mongoose.model("AdminHome", AdminHomeSchema);
