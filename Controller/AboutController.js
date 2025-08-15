import catchAsyncErrors from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../middlewares/error.js";
import { About } from "../models/AboutSchema.js";
import { v2 as cloudinary } from "cloudinary";

// Add new About entry
export const addNewAbout = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || !req.files.image) {
    return next(new ErrorHandler("Image is required!", 400));
  }

  const { image } = req.files;
  const { title, description } = req.body;

  if (!title || !description) {
    return next(new ErrorHandler("Title and Description are required!", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath, {
    folder: "portfolio_about_images",
  });

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    return next(new ErrorHandler("Image upload failed", 500));
  }

  const abouts = await About.create({
    title,
    description,
    image: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "New About Entry Added!",
    abouts,
  });
});

// Get all About entries
export const getAllAbouts = catchAsyncErrors(async (req, res, next) => {
  const abouts = await About.find();
  res.status(200).json({
    success: true,
    abouts,
  });
});

export const updateAbout = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  // Debug logs (optional)
  console.log("req.body:", req.body);
  console.log("req.files:", req.files);

  // Get title and description from req.body
  const { title, description } = req.body;

  // Find existing about document
  let abouts = await About.findById(id);
  if (!abouts) {
    return next(new ErrorHandler("Entry not found", 404));
  }

  // If new image uploaded, delete old and upload new one
  if (req.files && req.files.image) {
    await cloudinary.uploader.destroy(abouts.image.public_id);

    const cloudinaryResponse = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      { folder: "portfolio_about_images" }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      return next(new ErrorHandler("Image upload failed", 500));
    }

    abouts.image = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  // Update title and description if provided
  if (title) abouts.title = title;
  if (description) abouts.description = description;

  // Save updated document
  await abouts.save();

  res.status(200).json({
    success: true,
    message: "About entry updated successfully",
    abouts,
  });
});



// Delete About entry
export const deleteAbout = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const aboutEntry = await About.findById(id);
  if (!aboutEntry) {
    return next(new ErrorHandler("Entry not found", 404));
  }

  await cloudinary.uploader.destroy(aboutEntry.image.public_id);
  await aboutEntry.deleteOne();

  res.status(200).json({
    success: true,
    message: "Entry deleted successfully",
  });

});

export const getAboutById = async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) {
      return res.status(404).json({ message: "About not found" });
    }
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
