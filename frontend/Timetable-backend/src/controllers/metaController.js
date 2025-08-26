import dotenv from "dotenv";
dotenv.config();

export const getMeta = async (req, res) => {
  res.json({
    runtime: "Node.js",
    framework: "Express",
    database: {
      type: "MySQL",
      host: process.env.DB_HOST || "",
      name: process.env.DB_NAME || "",
    },
    apis: [
      { method: "GET", path: "/api/health", desc: "Health check" },
      { method: "GET", path: "/api/teachers", desc: "List teachers" },
      { method: "POST", path: "/api/teachers", desc: "Create teacher" },
      { method: "GET", path: "/api/subjects", desc: "List subjects" },
      { method: "POST", path: "/api/subjects", desc: "Create subject" },
      { method: "GET", path: "/api/classes", desc: "List classes" },
      { method: "POST", path: "/api/classes", desc: "Create class" },
      { method: "GET", path: "/api/timeslots", desc: "List timeslots" },
      { method: "POST", path: "/api/timeslots", desc: "Create timeslot" },
      { method: "POST", path: "/api/timetable/generate", desc: "Generate timetable (GA)" },
      { method: "GET", path: "/api/timetable", desc: "Get generated timetable" },
    ],
    note: "Public: read-only info. Writes are restricted by server policy."
  });
};
