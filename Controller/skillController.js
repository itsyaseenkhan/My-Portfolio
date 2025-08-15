import catchAsyncError from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../middlewares/error.js";
import { skill } from "../models/SkillSchema.js";
import { v2 as cloudinary } from "cloudinary";


export const addNewSkill = catchAsyncError(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Skill Image is required!", 400));
  }

  const { image } = req.files; // ✅ name must match frontend field (image)
  const { title, proficiency } = req.body;

  if (!title || !proficiency) {
    return next(new ErrorHandler("Please fill all required fields!", 400));
  }

  const result = await cloudinary.uploader.upload(image.tempFilePath, {
    folder: "Portfolio Skills",
    resource_type: "image",
  });

  if (!result || result.error) {
    console.error("Cloudinary Error:", result?.error || "Unknown Cloudinary Error");
    return next(new ErrorHandler("Failed to upload image to Cloudinary", 500));
  }

  const newSkill = await skill.create({
    title,
    proficiency,
    Svg: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New skill added!",
    skill: newSkill,
  });
});



export const deleteSkill =catchAsyncError(async(req, res, next) =>{
   const { id } = req.params;
  
    const skills = await skill.findById(id);
    if (!skills) {
      return next(new ErrorHandler("skill not found !", 404));
    }
  
    if (skill.svg && skills.svg.public_id) {
      await cloudinary.uploader.destroy(skills.svg.public_id);
    } else {
      console.log("No SVG found — skipping Cloudinary deletion.");
    }
  
    await skills.deleteOne();
  
    res.status(200).json({
      success: true,
      message: "Skill Deleted!",
    });

})

 export const updateSkill = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { proficiency } = req.body;

  const updatedSkill = await skill.findByIdAndUpdate(
    id,
    { proficiency },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  if (!updatedSkill) {
    return next(new ErrorHandler("Skill not found!", 404));
  }

  res.status(200).json({
    success: true,
    message: "Skill updated",
    skill: updatedSkill,
  });
});

export const getallSkills =catchAsyncError(async(req, res, next) =>{
    const skills = await skill.find();
    res.status(200).json({
      success: true,
   skills,
    })
}) 
