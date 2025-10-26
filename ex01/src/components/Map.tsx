import React, { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { Suggestion } from '../lib/mockPlanner'

// Fix leaflet's default icon path when bundlers copy assets differently
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
})

type Props = {
  markers?: Suggestion[]
  selectedId?: string | null
  onSelect?: (id: string) => void
}

function Recenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()
  useEffect(() => {
    map.setView([lat, lng], map.getZoom(), { animate: true })
  }, [lat, lng, map])
  return null
}

export default function Map({ markers = [], selectedId, onSelect }: Props) {
  const first = markers[0]
  const center: [number, number] = first ? [first.lat, first.lng] : [48.8566, 2.3522]

  // reference to marker instances if needed
  const markerRefs = useRef<Record<string, L.Marker>>({})

  return (
    <div className="mt-4 h-64 rounded-lg overflow-hidden border border-slate-200">
      <MapContainer center={center} zoom={5} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((m) => (
          <Marker
            key={m.id}
            position={[m.lat, m.lng]}
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

        {selectedId && markers.length > 0 && (() => {
          const sel = markers.find((m) => m.id === selectedId)
          return sel ? <Recenter lat={sel.lat} lng={sel.lng} /> : null
        })()}
      </MapContainer>
    </div>
  )
}
