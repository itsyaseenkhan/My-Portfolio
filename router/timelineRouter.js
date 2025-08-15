
import express from "express";
import {PostTimeline,deleteTimeline, getAllTimelines} from "../Controller/timelineController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add",PostTimeline );
router.delete("/delete/:id", isAuthenticated ,deleteTimeline );
router.get("/getall", getAllTimelines);


export default router;