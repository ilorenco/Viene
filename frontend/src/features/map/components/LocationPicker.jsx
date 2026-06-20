// Mini-mapa para escolher a localização de um ponto: toque para marcar e
// arraste o pino para ajustar.

import L from 'leaflet'
import { useEffect } from 'react'
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import { JOINVILLE_CENTER, MAP_ATTRIBUTION, MAP_TILE_URL } from '@/features/map/constants'

const pickIcon = L.divIcon({
    className: '',
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    html: `
        <svg width="34" height="34" viewBox="0 0 24 24" fill="#f48634" xmlns="http://www.w3.org/2000/svg"
            style="filter: drop-shadow(0 2px 3px rgba(0,0,0,.35))">
            <path d="M12 2a7 7 0 0 0-7 7c0 4.5 7 13 7 13s7-8.5 7-13a7 7 0 0 0-7-7z" />
            <circle cx="12" cy="9" r="2.6" fill="#fff" />
        </svg>
    `,
})

function ClickToPlace({ onPick }) {
    useMapEvents({
        click(event) {
            onPick([event.latlng.lat, event.latlng.lng])
        },
    })
    return null
}

// Corrige o tamanho do mapa quando ele abre dentro do popup (evita tiles cinza).
function FixSize() {
    const map = useMap()
    useEffect(() => {
        const timer = setTimeout(() => map.invalidateSize(), 50)
        return () => clearTimeout(timer)
    }, [map])
    return null
}

export function LocationPicker({ position, onChange }) {
    return (
        <MapContainer
            center={position ?? JOINVILLE_CENTER}
            zoom={13}
            className="h-48 w-full rounded-2xl"
        >
            <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_TILE_URL} />
            <FixSize />
            <ClickToPlace onPick={onChange} />
            {position && (
                <Marker
                    position={position}
                    draggable
                    eventHandlers={{
                        dragend: (event) => {
                            const latlng = event.target.getLatLng()
                            onChange([latlng.lat, latlng.lng])
                        },
                    }}
                    icon={pickIcon}
                />
            )}
        </MapContainer>
    )
}
