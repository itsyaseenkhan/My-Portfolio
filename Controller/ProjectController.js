import  catchAsyncError  from "../middlewares/catchAsyncError.js";
import {ErrorHandler} from "../middlewares/error.js";
import { Project } from "../models/projectSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewProject = catchAsyncError(async (req, res, next) => {
  console.log("🟡 Incoming Files:", req.files);
  console.log("🟡 Incoming Body:", req.body);

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Project Banner Image Required!", 404));
  }

 
  const cleanedBody = {};
  Object.entries(req.body).forEach(([key, value]) => {
    const cleanKey = key.trim();
    cleanedBody[cleanKey] = typeof value === 'string' ? value.trim() : value;
  });

  const {
    title,
    description,
    gitRepoLink,
    projectLink,
    stack,
    technologies,
    deployed,
  } = cleanedBody;

  if (
    !title ||
    !description ||
    !gitRepoLink ||
    !projectLink ||
    !stack ||
    !technologies ||
    !deployed
  ) {
    return next(new ErrorHandler("Please Provide All Details!", 400));
  }

  const { projectBanner } = req.files;

  const cloudinaryResponse = await cloudinary.uploader.upload(
    projectBanner.tempFilePath,
    { folder: "PORTFOLIO PROJECT IMAGES" }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown error");
    return next(new ErrorHandler("Failed to upload banner to Cloudinary", 500));
  }

  const project = await Project.create({
    title,
    description,
    gitRepoLink,
    projectLink,
    stack,
    technologies,
    deployed,
    projectBanner: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "New Project Added!",
    Project: project,
  });
});
export const updateProject = catchAsyncError(async (req, res, next) => {
  const newProjectData = {};


  if (req.body.title) newProjectData.title = req.body.title;
  if (req.body.description) newProjectData.description = req.body.description;
  if (req.body.gitRepoLink) newProjectData.gitRepoLink = req.body.gitRepoLink;
  if (req.body.projectLink) newProjectData.projectLink = req.body.projectLink;
  if (req.body.stack) newProjectData.stack = req.body.stack;
  if (req.body.technologies) newProjectData.technologies = req.body.technologies;
  if (req.body.deployed) newProjectData.deployed = req.body.deployed;


  let project = await Project.findById(req.params.id);
  if (!project) {
    return next(new ErrorHandler("Project not found!", 404));
  }

  // 🖼️ If new banner is uploaded
  if (req.files && req.files.projectBanner) {
    const projectBanner = req.files.projectBanner;

    // Delete old image from Cloudinary
    if (project.projectBanner?.public_id) {
      await cloudinary.uploader.destroy(project.projectBanner.public_id);
    }

    // Upload new image
    const cloudinaryResponse = await cloudinary.uploader.upload(
      projectBanner.tempFilePath,
      { folder: "PORTFOLIO PROJECT IMAGES" }
    );

    newProjectData.projectBanner = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }
  project = await Project.findByIdAndUpdate(req.params.id, newProjectData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "Project updated successfully ✅",
    project,
  });
});



export const deleteProject = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new ErrorHandler("Project not found", 404));
  }
  await Project.deleteOne();
  res.status(200).json({
    success: true,
    message: "Project Deleted!",
  });
});


export const getAllProjects = catchAsyncError(async (req, res, next) => {
  const projects = await Project.find(); // ✅ plural name

  res.status(200).json({
    success: true,
    projects, 
  });
});

export const getallSingleProject = catchAsyncError(async(req,res, next)=>{
    const {id} = req.params;
     const project  = await Project.findById(id);
     if(!project){
       return next (new ErrorHandler("Project not found!",404));
     }

     res.status(200).json({
      success: true,
      project,

     });
});