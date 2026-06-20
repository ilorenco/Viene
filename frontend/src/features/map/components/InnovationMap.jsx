import L from 'leaflet'
import { useEffect, useMemo, useRef } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

const JOINVILLE_CENTER = [-26.3041, -48.8478]
export const EVENT_COLOR = '#7c3aed'

// Cor do marcador de agrupamento quando há tipos diferentes no mesmo ponto
// (laranja da marca). Quando todos são da mesma cor, usa a cor do tipo.
const CLUSTER_MIXED_COLOR = '#f48634'

function createPinIcon(color, selected) {
    const size = selected ? 46 : 32
    // Contorno branco (não muda a cor do pino) só para destacar o selecionado.
    const stroke = selected ? 'stroke="#ffffff" stroke-width="1.5"' : ''

    return L.divIcon({
        className: '',
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        html: `
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" ${stroke}
                xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 3px rgba(0,0,0,.35))">
                <path d="M12 2a7 7 0 0 0-7 7c0 4.5 7 13 7 13s7-8.5 7-13a7 7 0 0 0-7-7z" />
                <circle cx="12" cy="9" r="2.6" fill="#fff" />
            </svg>
        `,
    })
}

// Ícone do agrupamento: mesmo FORMATO de gota dos pinos normais, em uma só cor,
// com a quantidade de itens dentro (num círculo branco, no lugar do pontinho).
function createClusterIcon(count, color) {
    const size = 42

    return L.divIcon({
        className: '',
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        html: `
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}"
                xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 3px rgba(0,0,0,.35))">
                <path d="M12 2a7 7 0 0 0-7 7c0 4.5 7 13 7 13s7-8.5 7-13a7 7 0 0 0-7-7z" />
                <circle cx="12" cy="9" r="5.2" fill="#fff" />
                <text x="12" y="9" text-anchor="middle" dominant-baseline="central"
                    font-family="Inter, sans-serif" font-weight="700" font-size="6.5" fill="#282828">${count}</text>
            </svg>
        `,
    })
}

// Agrupa os itens que estão na MESMA coordenada (lat,lng idênticos).
function groupByPosition(items) {
    const groups = new Map()
    for (const item of items) {
        const key = `${item.position[0]},${item.position[1]}`
        if (!groups.has(key)) groups.set(key, [])
        groups.get(key).push(item)
    }
    return [...groups.values()]
}

// Marcador de agrupamento: ao clicar, abre um popup com a lista dos itens daquele
// ponto; clicar num nome seleciona o item (abre a especificação).
function ClusterMarker({ group, onSelect }) {
    const map = useMap()
    const colors = [...new Set(group.map((member) => member.color))]
    const color = colors.length === 1 ? colors[0] : CLUSTER_MIXED_COLOR
    const icon = createClusterIcon(group.length, color)

    return (
        <Marker position={group[0].position} icon={icon}>
            <Popup>
                <div className="flex max-h-48 min-w-44 flex-col gap-1 overflow-y-auto">
                    <p className="text-secondary font-montserrat px-1 text-xs font-extrabold">
                        {group.length} neste local
                    </p>
                    {group.map((member) => (
                        <button
                            key={`${member.kind}-${member.id}`}
                            type="button"
                            onClick={() => {
                                onSelect({ type: member.kind, id: member.id })
                                map.closePopup()
                            }}
                            className="hover:bg-secondary/10 flex items-center gap-2 rounded-lg p-1.5 text-left"
                        >
                            <span
                                className="size-3 shrink-0 rounded-full"
                                style={{ backgroundColor: member.color }}
                            />
                            <span className="text-secondary truncate text-sm font-semibold">
                                {member.name}
                            </span>
                        </button>
                    ))}
                </div>
            </Popup>
        </Marker>
    )
}

// Captura a instância do mapa e a entrega ao componente pai (zoom, flyTo...).
// Guarda onReady numa ref para o efeito depender só do mapa (evita reentregas).
function MapReady({ onReady }) {
    const map = useMap()
    const ref = useRef(onReady)
    useEffect(() => {
        ref.current = onReady
    })
    useEffect(() => {
        if (ref.current) ref.current(map)
    }, [map])
    return null
}

export function InnovationMap({ actors = [], events = [], selected, onSelect, onMapReady }) {
    // Junta atores e eventos numa lista única (com kind/cor) e agrupa por ponto.
    // Só recalcula quando os itens visíveis mudam (filtros, busca).
    const groups = useMemo(() => {
        const members = [
            ...actors.map((actor) => ({
                kind: 'ator',
                id: actor.id,
                name: actor.name,
                color: actor.color,
                position: actor.position,
            })),
            ...events.map((event) => ({
                kind: 'evento',
                id: event.id,
                name: event.title,
                color: EVENT_COLOR,
                position: event.position,
            })),
        ]
        return groupByPosition(members)
    }, [actors, events])

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

            <MapReady onReady={onMapReady} />

            {groups.map((group) => {
                // Vários itens no mesmo ponto -> marcador de agrupamento.
                if (group.length > 1) {
                    const [{ position }] = group
                    return (
                        <ClusterMarker
                            key={`cluster-${position[0]},${position[1]}`}
                            group={group}
                            onSelect={onSelect}
                        />
                    )
                }

                // Item único -> pino normal (com destaque quando selecionado).
                const member = group[0]
                const isSelected = selected?.type === member.kind && selected.id === member.id
                return (
                    <Marker
                        key={`${member.kind}-${member.id}`}
                        position={member.position}
                        icon={createPinIcon(member.color, isSelected)}
                        eventHandlers={{
                            click: () => onSelect({ type: member.kind, id: member.id }),
                        }}
                    />
                )
            })}
        </MapContainer>
    )
}
