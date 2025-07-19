// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const Project = require('../Models/Project'); // Assuming you have a Project model

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/projects/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// // Get all projects
// router.get('/', async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.json(projects);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Create a new project
// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     const { title, description, link } = req.body;
    
//     const project = new Project({
//       title,
//       description,
//       link,
//       image: req.file ? '/uploads/projects/' + req.file.filename : null
//     });

//     const savedProject = await project.save();
//     res.status(201).json(savedProject);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Update a project
// router.put('/:id', upload.single('image'), async (req, res) => {
//   try {
//     const { title, description, link } = req.body;
//     const updateData = { title, description, link };
    
//     if (req.file) {
//       updateData.image = '/uploads/projects/' + req.file.filename;
//     }

//     const updatedProject = await Project.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     if (!updatedProject) {
//       return res.status(404).json({ message: 'Project not found' });
//     }

//     res.json(updatedProject);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete a project
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedProject = await Project.findByIdAndDelete(req.params.id);
    
//     if (!deletedProject) {
//       return res.status(404).json({ message: 'Project not found' });
//     }

//     res.json({ message: 'Project deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const { storage, deleteFromCloudinary } = require('../utils/cloudinary');
const multer = require('multer');
const Project = require("../Models/Project");

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create project
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const newProject = new Project({
      title,
      description,
      link,
      image: req.file?.path || null
    });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update project
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (req.file && project.image) {
      await deleteFromCloudinary(project.image);
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        image: req.file?.path || project.image
      },
      { new: true }
    );

    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete project
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.image) {
      await deleteFromCloudinary(project.image);
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;