# Timetable Generator (Full Stack)

- frontend/: React + Vite + Tailwind (Vercel)
- backend/: Node.js + Express + MySQL + GA stub (Render/Railway)
- Backend info page (read-only): /backend

## Local Development
Backend:
  cd backend
  copy .env.example .env
  npm install
  npm run dev   # http://localhost:5000

Frontend:
  cd frontend
  npm install
  npm run dev   # http://localhost:5173

## Production
1) Deploy backend (Render/Railway)
   - Root: backend/
   - Build: npm install
   - Start: npm run start
   - Env: PORT=5000, DB_HOST, DB_USER, DB_PASS, DB_NAME
2) Vercel (frontend)
   - Root: frontend/
   - Env: VITE_API_BASE = https://<your-backend-host>

