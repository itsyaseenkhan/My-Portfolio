// ProjectRoute.js
import express from "express";
import {
  addNewProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getallSingleProject
} from "../Controller/ProjectController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Routes
router.post("/add", isAuthenticated, addNewProject);
router.put("/update/:id", isAuthenticated, updateProject);
router.delete("/delete/:id", isAuthenticated, deleteProject);
router.get("/getall", getAllProjects);
router.get("/get/:id", getallSingleProject);

export default router;
