import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

import { JOINVILLE_CENTER, MAP_ATTRIBUTION, MAP_TILE_URL } from '@/features/map/constants'
import { createPinIcon } from '@/features/map/pinIcon'

import 'leaflet/dist/leaflet.css'

const pickIcon = createPinIcon()

function toLatLngArray(latlng) {
    return [latlng.lat, latlng.lng]
}

function ClickToPlace({ onPick }) {
    useMapEvents({
        click(event) {
            onPick(toLatLngArray(event.latlng))
        },
    })
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
            <ClickToPlace onPick={onChange} />
            {position && (
                <Marker
                    position={position}
                    draggable
                    eventHandlers={{
                        dragend: (event) => onChange(toLatLngArray(event.target.getLatLng())),
                    }}
                    icon={pickIcon}
                />
            )}
        </MapContainer>
    )
}
