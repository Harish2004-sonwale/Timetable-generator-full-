import db from "../config/db.js";

export const listTeachers = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM teachers");
  res.json(rows);
};

export const createTeacher = async (req, res) => {
  const { name, department } = req.body;
  await db.query(
    "INSERT INTO teachers (name, department) VALUES (?, ?)",
    [name, department || null]
  );
  res.json({ success: true });
};
