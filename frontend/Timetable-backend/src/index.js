import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import teacherRoutes from "./routes/teachers.js";
import subjectRoutes from "./routes/subjects.js";
import classRoutes from "./routes/classes.js";
import timeslotRoutes from "./routes/timeslots.js";
import timetableRoutes from "./routes/timetable.js";
import { getMeta } from "./controllers/metaController.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.get("/api/meta", getMeta);

// Routes
app.use("/api/teachers", teacherRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/timeslots", timeslotRoutes);
app.use("/api/timetable", timetableRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
