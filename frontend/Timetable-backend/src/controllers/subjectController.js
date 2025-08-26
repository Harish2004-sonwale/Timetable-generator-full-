import db from "../config/db.js";

export const listSubjects = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM subjects");
  res.json(rows);
};

export const createSubject = async (req, res) => {
  const { name, teacher_id } = req.body;
  await db.query(
    "INSERT INTO subjects (name, teacher_id) VALUES (?, ?)",
    [name, teacher_id || null]
  );
  res.json({ success: true });
};
