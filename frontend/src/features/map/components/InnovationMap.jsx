import L from 'leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

const JOINVILLE_CENTER = [-26.3041, -48.8478]

function createPinIcon(selected) {
    const color = selected ? 'var(--color-secondary, #282828)' : 'var(--color-primary, #f48634)'
    const size = selected ? 42 : 34

    return L.divIcon({
        className: '',
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        html: `
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}"
                xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 3px rgba(0,0,0,.35))">
                <path d="M12 2a7 7 0 0 0-7 7c0 4.5 7 13 7 13s7-8.5 7-13a7 7 0 0 0-7-7z" />
                <circle cx="12" cy="9" r="2.6" fill="#fff" />
            </svg>
        `,
    })
}

export function InnovationMap({ units, selectedId, onSelectUnit }) {
    return (
        <MapContainer
            center={JOINVILLE_CENTER}
            zoom={13}
            zoomControl={false}
            className="absolute inset-0 h-full w-full"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {units.map((unit) => (
                <Marker
                    key={unit.id}
                    position={unit.position}
                    icon={createPinIcon(unit.id === selectedId)}
                    eventHandlers={{ click: () => onSelectUnit(unit.id) }}
                />
            ))}
        </MapContainer>
    )
}
