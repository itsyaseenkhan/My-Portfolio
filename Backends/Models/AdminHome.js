const mongoose = require('mongoose');

const adminHomeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  cvLink: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('AdminHome', adminHomeSchema);
