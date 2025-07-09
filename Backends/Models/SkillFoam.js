const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true },
  type: { type: String, enum: ['technical', 'professional'], required: true }
});

module.exports = mongoose.model('Skill', skillSchema);
