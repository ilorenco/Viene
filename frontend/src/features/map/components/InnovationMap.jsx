import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import { JOINVILLE_CENTER, MAP_ATTRIBUTION, MAP_TILE_URL } from '@/features/map/constants'
import { createPinIcon } from '@/features/map/pinIcon'

import 'leaflet/dist/leaflet.css'

export function InnovationMap({ units, selectedId, onSelectUnit }) {
    return (
        <MapContainer
            center={JOINVILLE_CENTER}
            zoom={13}
            zoomControl={false}
            className="absolute inset-0 h-full w-full"
        >
            <TileLayer attribution={MAP_ATTRIBUTION} url={MAP_TILE_URL} />

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
