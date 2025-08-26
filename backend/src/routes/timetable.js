import express from "express";
import { generateTimetable, getAllTimetables } from "../controllers/timetableController.js";
const router = express.Router();

router.post("/generate", generateTimetable);
router.get("/", getAllTimetables);

export default router;
