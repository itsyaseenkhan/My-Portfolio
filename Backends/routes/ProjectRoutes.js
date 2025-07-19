const express = require('express');
const Project = require('../Models/Project');
const router = express.Router();

// CREATE a new project
router.post(
  '/',
  uploadSingle('image'),
  handleMulterError,
  async (req, res) => {
    try {
      const { title, description, link, technologies, featured } = req.body;

      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
      }

      let imageData = {};
      if (req.file) {
        imageData = {
          buffer: req.file.buffer,
          mimetype: req.file.mimetype,
          size: req.file.size,
          originalName: req.file.originalname
        };
      }

      const projectData = {
        title,
        description,
        link: link || '',
        image: imageData,
        technologies: technologies ? JSON.parse(technologies) : [],
        featured: featured === 'true' || featured === true
      };

      const newProject = new Project(projectData);
      await newProject.save();

      res.status(201).json({
        message: 'Project created successfully',
        project: newProject
      });
    } catch (err) {
      console.error('Error creating project:', err);
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  }
);

// READ all projects
router.get('/', async (req, res) => {
  try {
    const { featured, limit, sort } = req.query;

    let query = {};
    if (featured === 'true') {
      query.featured = true;
    }

    let projectsQuery = Project.find(query);

    if (sort === 'newest') {
      projectsQuery = projectsQuery.sort({ createdAt: -1 });
    } else if (sort === 'oldest') {
      projectsQuery = projectsQuery.sort({ createdAt: 1 });
    } else {
      projectsQuery = projectsQuery.sort({ updatedAt: -1 });
    }

    if (limit && !isNaN(limit)) {
      projectsQuery = projectsQuery.limit(parseInt(limit));
    }

    const projects = await projectsQuery;
    res.json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects', details: err.message });
  }
});

// READ single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ success: true, project });
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ error: 'Failed to fetch project', details: err.message });
  }
});

// UPDATE a project
router.put(
  '/:id',
  uploadSingle('image'),
  handleMulterError,
  async (req, res) => {
    try {
      const { title, description, link, technologies, featured } = req.body;

      const existingProject = await Project.findById(req.params.id);
      if (!existingProject) {
        return res.status(404).json({ error: 'Project not found' });
      }

      const updates = {
        title: title || existingProject.title,
        description: description || existingProject.description,
        link: link !== undefined ? link : existingProject.link,
        technologies: technologies ? JSON.parse(technologies) : existingProject.technologies,
        featured: featured !== undefined ? (featured === 'true' || featured === true) : existingProject.featured,
        updatedAt: new Date()
      };

      if (req.file) {
        updates.image = {
          buffer: req.file.buffer,
          mimetype: req.file.mimetype,
          size: req.file.size,
          originalName: req.file.originalname
        };
      }

      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
      );

      res.json({
        message: 'Project updated successfully',
        project: updatedProject
      });
    } catch (err) {
      console.error('Error updating project:', err);
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  }
);

// DELETE a project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({
      message: 'Project deleted successfully',
      deletedProject: {
        id: project._id,
        title: project.title
      }
    });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
