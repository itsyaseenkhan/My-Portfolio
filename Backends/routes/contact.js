const express = require('express');
const router = express.Router();
const ContactMessage = require('../Models/ContactMessage');

// POST /api/contact  <-- already correct
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newMessage = new ContactMessage({ name, email, subject, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


// ✅ ADD THIS: GET /api/contact
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// DELETE /api/contact/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const ContactMessage = require('../models/ContactMessage');

// // POST /api/contact  <-- already correct
// router.post('/', async (req, res) => {
//   const { name, email, subject, message } = req.body;

//   if (!name || !email || !subject || !message) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//     const newMessage = new ContactMessage({ name, email, subject, message });
//     await newMessage.save();
//     res.status(201).json({ message: 'Message sent successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });


// // ✅ ADD THIS: GET /api/contact
// router.get('/', async (req, res) => {
//   try {
//     const messages = await ContactMessage.find().sort({ createdAt: -1 });
//     res.status(200).json(messages);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch messages' });
//   }
// });

// // DELETE /api/contact/:id
// router.delete('/:id', async (req, res) => {
//   try {
//     const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
//     if (!deleted) {
//       return res.status(404).json({ error: 'Message not found' });
//     }
//     res.json({ message: 'Message deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;