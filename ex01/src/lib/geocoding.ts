/**
 * Geocode a place name using Nominatim (OpenStreetMap).
 * Returns an object { lat, lng } or null when not found.
 * Note: calling Nominatim from the browser can hit CORS or rate limits.
 */
export async function geocodeOSM(place: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json&limit=1`
    )

    if (!res.ok) throw new Error(`Error en geocoding: ${res.statusText}`)

    const data = await res.json()

    if (!data || data.length === 0) return null

    const lat = parseFloat(data[0].lat)
    const lng = parseFloat(data[0].lon)

    return { lat, lng }
  } catch (err) {
    console.error('geocodeOSM error', err)
    return null
  }
}

export default geocodeOSM
