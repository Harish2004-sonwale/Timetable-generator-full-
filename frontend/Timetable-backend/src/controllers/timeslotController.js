import db from "../config/db.js";

export const listTimeslots = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM timeslots");
  res.json(rows);
};

export const createTimeslot = async (req, res) => {
  const { day, start_time, end_time } = req.body;
  await db.query(
    "INSERT INTO timeslots (day, start_time, end_time) VALUES (?, ?, ?)",
    [day, start_time, end_time]
  );
  res.json({ success: true });
};
