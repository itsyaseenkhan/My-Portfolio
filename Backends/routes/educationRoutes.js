const express = require("express");
const router = express.Router();
const Education = require("../Models/Education");

router.post("/", async (req, res) => {
  try {
    const newEducation = new Education(req.body);
    await newEducation.save();
    res.status(201).json({ message: "Education added successfully." });
  } catch (err) {
    console.error("❌ Error adding education:", err);
    res.status(500).json({ error: "Server error while saving education." });
  }
});

// GET: Fetch all education records
router.get("/", async (req, res) => {
  try {
    const educationList = await Education.find().sort({ createdAt: -1 });
    res.status(200).json(educationList);
  } catch (err) {
    console.error("❌ Error fetching education:", err);
    res.status(500).json({ error: "Server error while fetching education." });
  }
});

// ✏️ PUT
router.put('/:id', async (req, res) => {
  try {
    const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🗑️ DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const Education = require("../Models/Education");

// router.post("/", async (req, res) => {
//   try {
//     const newEducation = new Education(req.body);
//     await newEducation.save();
//     res.status(201).json({ message: "Education added successfully." });
//   } catch (err) {
//     console.error("❌ Error adding education:", err);
//     res.status(500).json({ error: "Server error while saving education." });
//   }
// });

// // GET: Fetch all education records
// router.get("/", async (req, res) => {
//   try {
//     const educationList = await Education.find().sort({ createdAt: -1 });
//     res.status(200).json(educationList);
//   } catch (err) {
//     console.error("❌ Error fetching education:", err);
//     res.status(500).json({ error: "Server error while fetching education." });
//   }
// });

// // ✏️ PUT
// router.put('/:id', async (req, res) => {
//   try {
//     const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // 🗑️ DELETE
// router.delete('/:id', async (req, res) => {
//   try {
//     await Education.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


// module.exports = router;
