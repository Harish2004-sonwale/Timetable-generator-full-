import express from "express";
import { listSubjects, createSubject } from "../controllers/subjectController.js";
const router = express.Router();

router.get("/", listSubjects);
router.post("/", createSubject);

export default router;
