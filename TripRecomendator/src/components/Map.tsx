import React, { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

type UIPlace = { id: string; name: string; reason?: string; lat?: number; lng?: number }

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
})

const defaultMarkerIcon = new L.Icon({
  iconUrl: iconUrl as string,
  iconRetinaUrl: iconRetinaUrl as string,
  shadowUrl: shadowUrl as string,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
})

type Props = {
  markers?: UIPlace[]
  selectedId?: string | null
  onSelect?: (id: string) => void
}


function MapController({ selectedId, markerRefs, markers }: { selectedId?: string | null; markerRefs: React.MutableRefObject<Record<string, L.Marker>>; markers: UIPlace[] }) {
  const map = useMap()

  useEffect(() => {
    if (!selectedId) return

    
    const sel = markers.find((m) => m.id === selectedId && typeof m.lat === 'number' && typeof m.lng === 'number')
    if (!sel) return

    try {
      const latlng = L.latLng(sel.lat as number, sel.lng as number)
      const targetZoom = Math.max(map.getZoom(), 14)

      const offsetY = 100
      const point = map.project(latlng, targetZoom).subtract(L.point(0, offsetY))
      const centerLatLng = map.unproject(point, targetZoom)

      map.setView([centerLatLng.lat, centerLatLng.lng], targetZoom, { animate: true })

      
      let attempts = 0
      const tryOpen = () => {
        const marker = markerRefs.current[selectedId]
        if (marker && (marker as any).openPopup) {
          try { ;(marker as any).openPopup() } catch (e) { console.error('Error opening popup', e) }
          return
        }
        attempts += 1
        if (attempts < 6) setTimeout(tryOpen, 200)
      }

      setTimeout(tryOpen, 250)
    } catch (e) {
      console.error('Error centering map', e)
    }
  }, [selectedId, markerRefs, map, markers])

  return null
}

export default function Map({ markers = [], selectedId, onSelect }: Props) {
  const first = markers[0]
  const center: [number, number] = first && typeof first.lat === 'number' && typeof first.lng === 'number' ? [first.lat, first.lng] : [48.8566, 2.3522]

  
  const markerRefs = useRef<Record<string, L.Marker>>({})

  
  React.useEffect(() => {
    if (!selectedId) return
    const marker = markerRefs.current[selectedId]
    if (marker && (marker as any).openPopup) {
      try {
        ;(marker as any).openPopup()
      } catch (e) {
        console.error('Error opening popup', e)
      }
    }
  }, [selectedId])

  return (
    <div className="mt-4 h-64 rounded-lg overflow-hidden border border-slate-200">
      <MapContainer center={center} zoom={5} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.filter((m) => typeof m.lat === 'number' && typeof m.lng === 'number').map((m) => (
          <Marker
            key={m.id}
            position={[m.lat as number, m.lng as number]}
            icon={defaultMarkerIcon}
            eventHandlers={{ click: () => onSelect?.(m.id) }}
            ref={(el: L.Marker | null) => {
              if (el) markerRefs.current[m.id] = el
            }}
          >
            <Popup>
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm">{m.reason}</div>
            </Popup>
          </Marker>
        ))}

        {selectedId && markers.length > 0 && <MapController selectedId={selectedId} markerRefs={markerRefs} markers={markers} />}
      </MapContainer>
    </div>
  )
}
