import React, { useState } from 'react'
import Results from './components/Results'
import Map from './components/Map'
import { fetchAISuggestions } from './lib/ai'
import { geocodeOSM } from './lib/geocoding'

export default function App() {
  const [text, setText] = useState('')
  const [results, setResults] = useState<string | null>(null)
  type UIPlace = { id: string; name: string; reason?: string; lat?: number; lng?: number }
  const [suggestions, setSuggestions] = useState<UIPlace[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    if (!text.trim()) return
    setLoading(true)
    setResults(null)

    await new Promise((r) => setTimeout(r, 200))
    try {
      const ai = await fetchAISuggestions(text)
      const mapped: UIPlace[] = ai.map((it) => ({
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
        name: it.name,
        reason: it.query ? `query: ${it.query}` : undefined,
      }))

      setSuggestions(mapped)
      setSelectedId(mapped.length > 0 ? mapped[0].id : null)
      setResults(`AI returned ${mapped.length} suggestion(s). Geocoding…`)


      const resolved: UIPlace[] = []
      for (const m of mapped) {
        const query = m.reason && m.reason.startsWith('query:') ? m.reason.replace(/^query:\s*/, '') : m.name
        const geo = await geocodeOSM(query)
        resolved.push({ ...m, lat: geo?.lat, lng: geo?.lng })
       
        setSuggestions([...resolved, ...mapped.slice(resolved.length)])
        
        await new Promise((r) => setTimeout(r, 200))
      }

      setResults(`Resolved ${resolved.filter((r) => typeof r.lat === 'number' && typeof r.lng === 'number').length} geocoded suggestion(s).`)
    } catch (err) {
      console.error('AI/geocode error', err)
      setResults('Failed to fetch or geocode suggestions.')
    }
    setLoading(false)
  }

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">TripRecommendator — DGARIZAD GLOBANT</h1>
        <p className="text-slate-700 mt-1">Describe your ideal trip below (e.g., "quiet European city with museums and coffee"). We'll suggest destinations.</p>
      </header>

      <form onSubmit={handleSubmit} aria-labelledby="trip-label">
        <div className="flex flex-col gap-3">
          <label id="trip-label" htmlFor="trip-description" className="font-semibold">Describe your trip</label>
          <textarea
            id="trip-description"
            rows={5}
            value={text}
            onChange={(ev) => setText(ev.target.value)}
            placeholder="e.g., a quiet city in Europe with great museums and coffee shops"
            className="w-full p-3 text-base rounded-md border border-slate-300 resize-vertical min-h-[120px]"
            aria-required="true"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-sky-600 text-white px-4 py-2 rounded-md font-semibold disabled:opacity-60 hover:bg-sky-700 disabled:hover:bg-sky-600"
              disabled={loading}
            >
              {loading ? 'Thinking…' : 'Find Destinations'}
            </button>

            <button
              type="button"
              onClick={() => { setText(''); setResults(null) }}
              className="bg-slate-100 text-slate-800 px-4 py-2 rounded-md hover:bg-slate-200 font-semibold"
            >
              Clear
            </button>
          </div>
        </div>
        
      </form>

  <Results loading={loading} resultsText={results} suggestions={suggestions} selectedId={selectedId} onSelect={(id) => setSelectedId(id)} />
  
  <Map markers={suggestions.filter((s) => typeof s.lat === 'number' && typeof s.lng === 'number') as any} selectedId={selectedId} onSelect={(id) => setSelectedId(id)} />
    </main>
  )
}

