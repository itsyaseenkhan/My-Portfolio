require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolioo",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
    resource_type: "image",
  },
});

const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return;
    const parts = imageUrl.split("/");
    const folder = parts[parts.length - 2];
    const file = parts[parts.length - 1].split(".")[0];
    const publicId = `${folder}/${file}`;
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("❌ Error deleting from Cloudinary:", err);
  }
};

module.exports = { storage, deleteFromCloudinary };
