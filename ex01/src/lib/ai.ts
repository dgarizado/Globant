export type AISuggestion = { name: string; query?: string }

function extractJsonArray(text: string): string | null {

  if (!text) return null
  const t = text.replace(/^\uFEFF/, '').trim()
  const fenceMatch = t.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fenceMatch && fenceMatch[1]) return fenceMatch[1].trim()
  const first = t.indexOf('[')
  const last = t.lastIndexOf(']')
  if (first !== -1 && last !== -1 && last > first) return t.slice(first, last + 1)

  try {
    JSON.parse(t)
    return t
  } catch (e) {
    return null
  }
}

/**
 * Ask the model to return a JSON array of places optimized for geocoding.
 * Returns an array of objects: { name, query? }
 */
export async function fetchAISuggestions(userInput: string): Promise<AISuggestion[]> {
  const systemPrompt = `
    You are a travel guide assistant. Given a user's free-text description of a desired trip,
    return a JSON array (maximum 3 items) with places that are concrete and likely resolvable
    by a geocoding service.

    OUTPUT RULES (very important):
    - Return EXACTLY one JSON array and nothing else. Do NOT add any extra text or explanation.
    - Each item must be an object with at least a "name" field (a short human-friendly name).
    - Add an optional "query" field that is an optimized search string for geocoding (e.g. include city and country when helpful).
    - Prefer canonical/recognizable place names (e.g. "Eiffel Tower"), but include a "query" such as "Eiffel Tower, Paris, France" to help geocoders.
    - Maximum 3 items.
    - Verify that youre not hallucinating places; only include real-world locations.
    - Verify that the places you suggest actually exist in the place that the user seems to be interested in.
    - Do not duplicate the input into your suggestions.

    Example of exact required format:
    [
    {"name": "Eiffel Tower", "query": "Eiffel Tower, Paris, France"},
    {"name": "Louvre Museum", "query": "Louvre Museum, Paris, France"}
    ]
    `

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userInput },
  ]

  try {
    let resp: any = null
    try {
      const mod = await import('openai')
      const OpenAI = (mod as any).OpenAI
      const client = new OpenAI({
        baseURL: 'https://router.huggingface.co/v1',
        apiKey: (import.meta as any).env?.VITE_HF_API_KEY,
        dangerouslyAllowBrowser: true,
      })

      resp = await client.chat.completions.create({ model: 'meta-llama/Llama-3.3-70B-Instruct:hyperbolic', messages })
    } catch (impErr) {
      console.error('fetchAISuggestions: could not import OpenAI client', impErr)
      return []
    }

    const raw = resp?.choices?.[0]?.message?.content || ''
    const jsonText = extractJsonArray(raw)
    if (!jsonText) {
      console.error('fetchAISuggestions: could not extract JSON from model output', raw)
      return []
    }

    let parsed: any
    try {
      parsed = JSON.parse(jsonText)
    } catch (e) {
      console.error('fetchAISuggestions: JSON.parse failed', e, jsonText)
      return []
    }

    if (!Array.isArray(parsed)) return []

    return parsed
      .slice(0, 3)
      .map((it: any) => ({ name: String(it.name || '').trim(), query: it.query ? String(it.query).trim() : undefined }))
      .filter((it: AISuggestion) => !!it.name)
  } catch (err) {
    console.error('fetchAISuggestions: request error', err)
    return []
  }
}

export default fetchAISuggestions
