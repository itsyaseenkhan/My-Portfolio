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

// Configure multer with Cloudinary storage
const upload = multer({ 
  storage: storage,
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1 
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Helper function to handle errors
const handleError = (res, status, message) => {
  console.error(message);
  return res.status(status).json({
    success: false,
    message: message
  });
};

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      data: projects
    });
  } catch (err) {
    return handleError(res, 500, 'Failed to fetch projects');
  }
});

// Create new project
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, link } = req.body;

    // Validate required fields
    if (!title || !description || !link) {
      return handleError(res, 400, 'Title, description and link are required');
    }

    const newProject = new Project({
      title,
      description,
      link,
      image: req.file?.path || null
    });

    const savedProject = await newProject.save();

    return res.status(201).json({
      success: true,
      data: savedProject
    });
  } catch (err) {
    return handleError(res, 500, err.message || 'Failed to create project');
  }
});

// Update project
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return handleError(res, 404, 'Project not found');
    }

    // Delete old image if new one is uploaded
    if (req.file && project.image) {
      try {
        await deleteFromCloudinary(project.image);
      } catch (err) {
        console.error('Failed to delete old image:', err);
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title || project.title,
        description: req.body.description || project.description,
        link: req.body.link || project.link,
        image: req.file?.path || project.image
      },
      { new: true, runValidators: true }
    );

    return res.json({
      success: true,
      data: updatedProject
    });
  } catch (err) {
    return handleError(res, 500, err.message || 'Failed to update project');
  }
});

// Delete project
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return handleError(res, 404, 'Project not found');
    }

    // Delete image from Cloudinary if exists
    if (project.image) {
      try {
        await deleteFromCloudinary(project.image);
      } catch (err) {
        console.error('Failed to delete image:', err);
      }
    }

    await Project.findByIdAndDelete(req.params.id);
    
    return res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (err) {
    return handleError(res, 500, err.message || 'Failed to delete project');
  }
});

module.exports = router;