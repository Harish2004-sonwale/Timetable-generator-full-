import { useEffect, useState } from 'react'
import { API_BASE } from '../config/api.js'

export default function BackendInfo() {
  const [meta, setMeta] = useState(null)
  const [health, setHealth] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      try {
        const [h, m] = await Promise.all([
          fetch(`${API_BASE}/api/health`).then(r => r.json()),
          fetch(`${API_BASE}/api/meta`).then(r => r.json()),
        ])
        setHealth(h)
        setMeta(m)
      } catch (e) {
        setError('Unable to reach backend. Check API base and server status.')
      }
    }
    run()
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Backend Info</h1>
      <div className="text-sm text-gray-600">Read-only overview of backend runtime, database, and REST APIs.</div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <section className="bg-white border rounded p-4">
        <h2 className="font-medium mb-2">Status</h2>
        <div className="text-sm">Health: {health ? JSON.stringify(health) : 'Loading...'}</div>
      </section>

      <section className="bg-white border rounded p-4">
        <h2 className="font-medium mb-2">Runtime</h2>
        <div className="text-sm">{meta ? `${meta.runtime} + ${meta.framework}` : 'Loading...'}</div>
      </section>

      <section className="bg-white border rounded p-4">
        <h2 className="font-medium mb-2">Database</h2>
        {meta ? (
          <ul className="text-sm list-disc pl-5">
            <li>Type: {meta.database?.type}</li>
            <li>Host: {meta.database?.host}</li>
            <li>Name: {meta.database?.name}</li>
          </ul>
        ) : 'Loading...'}
      </section>

      <section className="bg-white border rounded p-4">
        <h2 className="font-medium mb-2">APIs</h2>
        {meta ? (
          <ul className="text-sm space-y-1">
            {meta.apis?.map((a, idx) => (
              <li key={idx} className="flex items-center justify-between border-b last:border-b-0 py-1">
                <div>
                  <span className="font-mono mr-2">{a.method}</span>
                  <span className="font-mono">{a.path}</span>
                </div>
                <span className="text-gray-500 text-xs">{a.desc}</span>
              </li>
            ))}
          </ul>
        ) : 'Loading...'}
      </section>

      <section className="bg-white border rounded p-4">
        <h2 className="font-medium mb-2">Security</h2>
        <div className="text-sm">Public users can only read this page. API writes (POST) are server-controlled; no one can commit or modify code via this UI. Admin-only changes happen via GitHub permissions and server access.</div>
      </section>
    </div>
  )
}
