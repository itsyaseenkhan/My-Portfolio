const Admin = require("../Models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// controllers/adminController.js

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin) return res.status(400).json({ msg: "Admin not found" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, "admin_jwt_secret", { expiresIn: "1d" });

  res.json({
    token,
    admin: {
      id: admin._id,
      email: admin.email,
      name: admin.name
    }
  });
};


exports.getMe = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, "admin_jwt_secret");
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) return res.status(404).json({ msg: "Admin not found" });

    res.json({
      name: admin.name,
      email: admin.email,
      image: admin.image // ✅ include this
    });
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};



exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin) return res.status(400).json({ msg: "Email not found" });

  const token = crypto.randomBytes(32).toString("hex");

  admin.resetToken = token;
  admin.resetTokenExpiry = Date.now() + 3600000; // valid for 1 hour
  await admin.save();

  console.log("🔗 Reset Link:", `http://localhost:3000/admin/reset-password/${token}`);

  // IMPORTANT: return the token!
  return res.json({
    msg: "Password reset link generated",
    token, 
    link: `http://localhost:3000/admin/reset-password/${token}`
  });
};


exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const admin = await Admin.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  if (!admin) {
    return res.status(400).json({ msg: "Invalid or expired token" });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  admin.password = hashed;
  admin.resetToken = undefined;
  admin.resetTokenExpiry = undefined;
  await admin.save();

  return res.json({ msg: "✅ Password updated successfully." });
};