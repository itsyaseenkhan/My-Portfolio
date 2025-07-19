// Load environment variables from .env file
require('dotenv').config();

// Import packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const adminRoutes = require('./routes/adminAuth');
const adminHomeRoutes = require('./routes/adminHome');
const projectRoutes = require('./routes/ProjectRoutes');
const aboutRoutes = require('./routes/Adminabout');
const skillRoutes = require('./routes/SkillFoam');
const educationRoutes = require('./routes/educationRoutes');
const contactRoutes = require('./routes/contact');

// Initialize app
const app = express();

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Enable parsing of JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "Profile"
}).then(() => {
  console.log('✅ MongoDB connected successfully');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Register API routes
app.use('/api/admin', adminRoutes);
app.use('/api/adminhome', adminHomeRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/contact', contactRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(500).json({
    msg: 'Something broke!',
    error: err.message || 'Unknown error occurred'
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
