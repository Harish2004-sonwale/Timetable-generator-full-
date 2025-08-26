import db from "../config/db.js";

export const listClasses = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM classes");
  res.json(rows);
};

export const createClass = async (req, res) => {
  const { name, year } = req.body;
  await db.query(
    "INSERT INTO classes (name, year) VALUES (?, ?)",
    [name, year || null]
  );
  res.json({ success: true });
};
