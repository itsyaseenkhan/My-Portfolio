import express from "express";
import {
  addNewAbout,
  getAllAbouts,
  deleteAbout,
  updateAbout,
    getAboutById,
} from "../Controller/AboutController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewAbout);
router.get("/getAll", getAllAbouts); 
router.put("/update/:id" , isAuthenticated,updateAbout);
router.get("/get/:id", getAboutById);
router.delete("/delete/:id", isAuthenticated, deleteAbout);

export default router;
