export type Suggestion = {
  id: string
  name: string
  reason: string
  lat: number
  lng: number
}

// Small deterministic map of keywords -> suggestions
const POI_MAP: Record<string, Suggestion[]> = {
  paris: [
    { id: 'paris', name: 'Paris, France', reason: 'Great museums and cafes', lat: 48.8566, lng: 2.3522 },
  ],
  lisbon: [
    { id: 'lisbon', name: 'Lisbon, Portugal', reason: 'Sunny, great coffee and nearby beaches', lat: 38.7223, lng: -9.1393 },
  ],
  prague: [
    { id: 'prague', name: 'Prague, Czechia', reason: 'Charming old town and low crowds', lat: 50.0755, lng: 14.4378 },
  ],
  bergen: [
    { id: 'bergen', name: 'Bergen, Norway', reason: 'Nature, fjords and fresh air', lat: 60.3913, lng: 5.3221 },
  ],
  default: [
    { id: 'lisbon', name: 'Lisbon, Portugal', reason: 'Sunny, cafés and culture', lat: 38.7223, lng: -9.1393 },
    { id: 'prague', name: 'Prague, Czechia', reason: 'Historic centre and museums', lat: 50.0755, lng: 14.4378 },
    { id: 'bergen', name: 'Bergen, Norway', reason: 'Coastal fjords and nature', lat: 60.3913, lng: 5.3221 },
  ],
}

// Simple keyword-based planner. Returns up to 3 suggestions.
export function generateSuggestions(query: string) {
  const q = (query || '').toLowerCase()
  const results: Suggestion[] = []

  // look for known keywords
  for (const key of Object.keys(POI_MAP)) {
    if (key === 'default') continue
    if (q.includes(key)) {
      results.push(...POI_MAP[key])
    }
  }

  if (results.length === 0) {
    // fallback to default list
    results.push(...POI_MAP.default)
  }

  // ensure unique and limit to 3
  const uniq = new Map<string, Suggestion>()
  for (const s of results) {
    if (!uniq.has(s.id)) uniq.set(s.id, s)
    if (uniq.size >= 3) break
  }

  return Array.from(uniq.values())
}
