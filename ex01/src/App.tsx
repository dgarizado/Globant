import React, { useState } from 'react'
import Results from './components/Results'
import Map from './components/Map'
import { generateSuggestions, type Suggestion } from './lib/mockPlanner'

export default function App() {
  const [text, setText] = useState('')
  const [results, setResults] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    if (!text.trim()) return
    setLoading(true)
    setResults(null)

    await new Promise((r) => setTimeout(r, 500))
    const sug = generateSuggestions(text)
    setSuggestions(sug)
    setSelectedId(sug.length > 0 ? sug[0].id : null)
    setResults(`Parsed (mock): ${text.trim().slice(0, 200)}`)
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
              className="bg-sky-600 text-white px-4 py-2 rounded-md font-semibold disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Thinking…' : 'Find Destinations'}
            </button>

            <button
              type="button"
              onClick={() => { setText(''); setResults(null) }}
              className="bg-slate-100 text-slate-800 px-4 py-2 rounded-md"
            >
              Clear
            </button>
          </div>
        </div>
        
      </form>

  <Results loading={loading} resultsText={results} suggestions={suggestions} selectedId={selectedId} onSelect={(id) => setSelectedId(id)} />
  <Map markers={suggestions} selectedId={selectedId} onSelect={(id) => setSelectedId(id)} />
    </main>
  )
}

