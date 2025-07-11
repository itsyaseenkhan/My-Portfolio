require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./Models/Admin"); // Ensure correct casing & path

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const name = "Yaseen Khan";
    const email = "gul49441@gmail.com";
    const password = "Yaseenkhan";

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("⚠️ Admin already exists");
    } else {
      const hashed = await bcrypt.hash(password, 10);

      const image = "uploads/1751825349457-WhatsApp_Image_2024-08-09_at_17.05.59_48e4d505-removebg-preview.png"; // ✅ Your default image path

      await Admin.create({ name, email, password: hashed, image });
      console.log("✅ Admin created with image");
    }

    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
