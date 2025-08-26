import express from "express";
import { listTeachers, createTeacher } from "../controllers/teacherController.js";
const router = express.Router();

router.get("/", listTeachers);
router.post("/", createTeacher);

export default router;
