// routes/adminAuth.js
const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  getMe,
  forgotPassword,
  resetPassword
} = require("../controllers/adminAuthController"); // ✅ Make sure the file path is correct

router.post("/login", loginAdmin);
router.get("/me", getMe);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
