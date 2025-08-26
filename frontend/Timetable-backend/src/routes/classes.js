import express from "express";
import { listClasses, createClass } from "../controllers/classController.js";
const router = express.Router();

router.get("/", listClasses);
router.post("/", createClass);

export default router;
