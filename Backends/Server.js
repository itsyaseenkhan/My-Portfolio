const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

// make sure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const adminAuthRoutes = require("./routes/adminAuth");
const adminHomeRoutes = require("./routes/adminHome");
const AboutRoutes = require("./routes/Adminabout");
const SkillFoamRoutes = require('./routes/SkillFoam');
const projectRoutes = require('./routes/ProjectRoutes');
const educationRoutes = require('./routes/educationRoutes');
const contactRoutes = require('./routes/contact');

app.use("/api/admin", adminAuthRoutes);
app.use("/api/adminhome", adminHomeRoutes);
app.use("/api/about", AboutRoutes); 
app.use('/api/SkillFoam', SkillFoamRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/AdminEducation',educationRoutes)
app.use('/api/contact', contactRoutes);

app.use('/uploads', express.static('uploads'));

// MongoDB connect
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   dbName: "Profile"
// })
// .then(() => console.log("✅ MongoDB Connected"))
// .catch(err => console.error("MongoDB connection error:", err));
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "Profile"
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
