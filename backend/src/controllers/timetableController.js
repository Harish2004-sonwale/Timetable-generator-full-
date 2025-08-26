import db from "../config/db.js";
import { runGeneticAlgorithm } from "../algorithms/geneticAlgorithm.js";

export const generateTimetable = async (req, res) => {
  try {
    const result = await runGeneticAlgorithm({ db });

    await db.query("DELETE FROM timetable");

    for (const row of result) {
      await db.query(
        "INSERT INTO timetable (class_id, subject_id, teacher_id, room_id, timeslot_id) VALUES (?, ?, ?, ?, ?)",
        [row.class_id, row.subject_id, row.teacher_id, row.room_id, row.timeslot_id]
      );
    }

    res.json({ success: true, timetable: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAllTimetables = async (req, res) => {
  const [rows] = await db.query(
    `SELECT t.id, c.name AS class, s.name AS subject, te.name AS teacher, ts.day, ts.start_time, ts.end_time
     FROM timetable t
     JOIN classes c ON t.class_id=c.id
     JOIN subjects s ON t.subject_id=s.id
     JOIN teachers te ON t.teacher_id=te.id
     JOIN timeslots ts ON t.timeslot_id=ts.id
     ORDER BY ts.day, ts.start_time`
  );
  res.json(rows);
};
