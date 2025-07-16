// require("dotenv").config();
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const Admin = require("./Models/Admin"); // Ensure correct casing & path

// mongoose.connect(process.env.MONGO_URI)
//   .then(async () => {
//     const name = "Yaseen Khan";
//     const email = "gul49441@gmail.com";
//     const password = "Yaseenkhan";

//     const existing = await Admin.findOne({ email });
//     if (existing) {
//       console.log("⚠️ Admin already exists");
//     } else {
//       const hashed = await bcrypt.hash(password, 10);

//       const image = "uploads/WhatsApp Image 2024-08-09 at 17.05.59_48e4d505.jpg"; 

//       await Admin.create({ name, email, password: hashed, image });
//       console.log("✅ Admin created with image");
//     }

//     process.exit();
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./Models/Admin"); // Ensure correct casing & path

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const name = "Yaseen Khan";
    const email = "gul494419@gmail.com";
    const password = "Yaseenkhan";

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("⚠️ Admin already exists");
    } else {
      const hashed = await bcrypt.hash(password, 10);

      const image = "uploads/WhatsApp Image 2024-08-09 at 17.05.59_48e4d505.jpg"; // ✅ Your default image path

      await Admin.create({ name, email, password: hashed, image });
      console.log("✅ Admin created with image");
    }

    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });