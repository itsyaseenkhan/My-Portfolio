const express = require('express');
const router = express.Router();
const SkillFoam = require('../Models/SkillFoam');

// GET all skillfoam
router.get('/', async (req, res) => {
  const skillfoam = await SkillFoam.find();
  const grouped = {
    technical: skillfoam.filter(s => s.type === 'technical'),
    professional: skillfoam.filter(s => s.type === 'professional')
  };
  res.json(grouped);
});

// POST create skillfoam
router.post('/', async (req, res) => {
  const { name, percentage, type } = req.body;
  const skillfoam = new SkillFoam({ name, percentage, type });
  await skillfoam.save();
  res.status(201).json(skillfoam);
});

// PUT update skillfoam
router.put('/:id', async (req, res) => {
  const { name, percentage } = req.body;
  const skillfoam = await SkillFoam.findByIdAndUpdate(req.params.id, { name, percentage }, { new: true });
  if (!skillfoam) return res.status(404).json({ message: 'SkillFoam not found' });
  res.json(skillfoam);
});

// DELETE skillfoam
router.delete('/:id', async (req, res) => {
  await SkillFoam.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;
