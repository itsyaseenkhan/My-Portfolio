const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Project = require('../Models/Project');

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer disk storage config for local uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // folder to save
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// CREATE a new project
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, link } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`; // relative path to access in frontend
    }

    const newProject = new Project({ title, description, link, image: imageUrl });
    await newProject.save();

    res.status(201).json({ message: 'Project created successfully' });
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// READ all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// UPDATE a project
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const updates = { title, description, link };

    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({ message: 'Project updated successfully', updated });
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a project
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const Project = require('../Models/Project');

// const router = express.Router();

// // Multer config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage });

// // CREATE a new project
// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     const { title, description, link } = req.body;
//     const image = req.file ? `/uploads/${req.file.filename}` : '';

//     const newProject = new Project({ title, description, link, image });
//     await newProject.save();

//     res.status(201).json({ message: 'Project created successfully' });
//   } catch (err) {
//     console.error('Error creating project:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // READ all projects
// router.get('/', async (req, res) => {
//   try {
//     const projects = await Project.find();
//     res.json(projects);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch projects' });
//   }
// });

// // UPDATE a project
// router.put('/:id', upload.single('image'), async (req, res) => {
//   try {
//     const { title, description, link } = req.body;
//     const updates = { title, description, link };

//     if (req.file) {
//       updates.image = `/uploads/${req.file.filename}`;
//     }

//     const updated = await Project.findByIdAndUpdate(req.params.id, updates, { new: true });

//     if (!updated) {
//       return res.status(404).json({ error: 'Project not found' });
//     }

//     res.json({ message: 'Project updated successfully' });
//   } catch (err) {
//     console.error('Error updating project:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // DELETE a project
// router.delete('/:id', async (req, res) => {
//   try {
//     const deleted = await Project.findByIdAndDelete(req.params.id);
//     if (!deleted) {
//       return res.status(404).json({ error: 'Project not found' });
//     }
//     res.json({ message: 'Project deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting project:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;