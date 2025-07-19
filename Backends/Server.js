// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const fs = require('fs');
// const path = require('path');

// const app = express();
// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   credentials: true
// }));

// app.use(express.json());

// // make sure uploads folder exists
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// const adminAuthRoutes = require("./routes/adminAuth");
// const adminHomeRoutes = require("./routes/adminHome");
// const AboutRoutes = require("./routes/Adminabout");
// const SkillFoamRoutes = require('./routes/SkillFoam');
// const projectRoutes = require('./routes/ProjectRoutes');
// const educationRoutes = require('./routes/educationRoutes');
// const contactRoutes = require('./routes/contact');

// app.use("/api/admin", adminAuthRoutes);
// app.use("/api/adminhome", adminHomeRoutes);
// app.use("/api/about", AboutRoutes); 
// app.use('/api/SkillFoam', SkillFoamRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/AdminEducation',educationRoutes)
// app.use('/api/contact', contactRoutes);

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   dbName: "Profile"
// })
// .then(() => console.log("✅ MongoDB Connected"))
// .catch(err => console.error("MongoDB connection error:", err));

// app.listen(5000, () => {
//   console.log("🚀 Server running on https://my-portfolio-backends.onrender.com");
// });


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();
// const fs = require('fs');
// const path = require('path');

// const app = express();
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));

// app.use(express.json());

// // make sure uploads folder exists
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// const adminAuthRoutes = require("./routes/adminAuth");
// const adminHomeRoutes = require("./routes/adminHome");
// const AboutRoutes = require("./routes/Adminabout");
// const skillFoamRoutes = require('./routes/SkillFoam');
// const projectRoutes = require('./routes/ProjectRoutes');
// const educationRoutes = require('./routes/educationRoutes');
// const contactRoutes = require('./routes/contact');

// app.use("/api/admin", adminAuthRoutes);
// app.use("/api/adminhome", adminHomeRoutes);
// app.use("/api/about", AboutRoutes); 
// app.use('/api/skillFoam', skillFoamRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/AdminEducation',educationRoutes)
// app.use('/api/contact', contactRoutes);

// app.use('/uploads', express.static('uploads'));

// // MongoDB connect
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   dbName: "Profile"
// })
// .then(() => console.log("✅ MongoDB Connected"))
// .catch(err => console.error("MongoDB connection error:", err));

// app.listen(5000, () => {
//   console.log("🚀 Server running on http://localhost:5000");
// });
// Load environment variables from .env file
require('dotenv').config();

// Import packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const adminRoutes = require('./routes/adminAuth');
const adminHomeRoutes = require('./routes/adminHome');

// Initialize app
const app = express();

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Enable parsing of JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected successfully');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Register API routes
app.use('/api/admin', adminRoutes);
app.use('/api/adminhome', adminHomeRoutes);

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
