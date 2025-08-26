import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import { API_BASE } from '../config/api.js'
import { useApp } from '../context/AppContext.jsx'

export default function GenerateSchedule() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { teachers, subjects, classes, groups, setTimetable } = useApp()

  const generate = async () => {
    // basic validation before generating
    if (teachers.length === 0 || subjects.length === 0 || classes.length === 0) {
      alert('Please add at least 1 Teacher, 1 Subject, and 1 Class in Manage Data before generating.')
      return
    }
    setLoading(true)
    try {
      // Trigger backend GA generation
      await fetch(`${API_BASE}/api/timetable/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })

      // Fetch enriched timetable rows for UI
      const res = await fetch(`${API_BASE}/api/timetable`)
      const rows = await res.json()

      const mapped = rows.map(r => ({
        slot: `${r.day} ${r.start_time} - ${r.end_time}`,
        class: r.class,
        subject: r.subject,
        teacher: r.teacher,
      }))

      setTimetable(mapped)
      navigate('/timetable')
    } catch (e) {
      console.error(e)
      alert('Generation failed. Ensure backend is running and DB has data.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Generate Schedule</h1>
      <button disabled={loading} onClick={generate} className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded">
        {loading ? 'Generating...' : 'Generate Timetable'}
      </button>
      <div className="text-sm text-gray-600">Make sure you have added Teachers, Subjects, and Classes in Manage Data.</div>
      {loading && <Loader />}
    </div>
  )
}
