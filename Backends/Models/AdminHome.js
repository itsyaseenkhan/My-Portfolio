const mongoose = require('mongoose');

const adminHomeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true,
    trim: true
  },
  roles: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'At least one role is required'
    }
  },
  imageUrl: {
    type: String,
    required: true
  },
  cvLink: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AdminHome', adminHomeSchema);