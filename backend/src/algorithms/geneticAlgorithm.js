export const runGeneticAlgorithm = async ({ db }) => {
  // Load base data
  const [teachers] = await db.query("SELECT * FROM teachers");
  const [subjects] = await db.query("SELECT * FROM subjects");
  const [classes] = await db.query("SELECT * FROM classes");
  const [timeslots] = await db.query("SELECT * FROM timeslots");

  if (!teachers.length || !subjects.length || !classes.length || !timeslots.length) {
    throw new Error("Insufficient data: need teachers, subjects, classes, timeslots");
  }

  // Placeholder: simple round-robin to unblock integration
  const timetable = [];
  let ti = 0, si = 0, ci = 0;
  for (const ts of timeslots) {
    const teacher = teachers[ti % teachers.length];
    const subject = subjects[si % subjects.length];
    const klass = classes[ci % classes.length];
    timetable.push({
      class_id: klass.id,
      subject_id: subject.id,
      teacher_id: teacher.id,
      room_id: null,
      timeslot_id: ts.id
    });
    ti++; si++; ci++;
  }
  return timetable;
};
