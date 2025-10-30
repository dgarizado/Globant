import React from 'react'

type UIPlace = { id: string; name: string; reason?: string; lat?: number; lng?: number }

type Props = {
  loading: boolean
  resultsText: string | null
  suggestions: UIPlace[]
  selectedId?: string | null
  onSelect?: (id: string) => void
}

export default function Results({ loading, resultsText, suggestions, selectedId, onSelect }: Props) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-medium mb-2">Results</h2>
      <div className="min-h-[60px] p-3 rounded-lg bg-white border border-sky-100 text-slate-900">
        {loading && <div>Loading…</div>}

        {!loading && suggestions.length > 0 && (
          <ul className="space-y-2">
            {suggestions.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onSelect?.(s.id)}
                  className={`w-full text-left p-2 rounded-md ${selectedId === s.id ? 'bg-sky-50 ring-1 ring-sky-200' : 'hover:bg-slate-50'}`}
                >
                  <div className="font-semibold">{s.name}</div>
                  {s.reason && <div className="text-sm text-slate-600">{s.reason}</div>}
                </button>
              </li>
            ))}
          </ul>
        )}

        {!loading && suggestions.length === 0 && resultsText && <div>{resultsText}</div>}

        {!loading && suggestions.length === 0 && !resultsText && <div className="text-slate-500">No results yet.</div>}
      </div>
    </div>
  )
}
