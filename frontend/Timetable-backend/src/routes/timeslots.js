import express from "express";
import { listTimeslots, createTimeslot } from "../controllers/timeslotController.js";
const router = express.Router();

router.get("/", listTimeslots);
router.post("/", createTimeslot);

export default router;
