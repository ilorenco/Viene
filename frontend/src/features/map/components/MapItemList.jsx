// Lista de itens visíveis no mapa (atores + eventos). Reutilizada no painel
// lateral (desktop) e na gaveta (mobile). Clicar centraliza o mapa no item.
// A busca fica fora deste componente (ver MapSearch) e já chega filtrada.

import { labelForType } from '@/features/actors/mocks/actorTypes'
import { EVENT_COLOR } from '@/features/map/components/InnovationMap'
import { cn } from '@/lib/utils'

function Row({ color, title, subtitle, active, onClick }) {
    return (
        <li>
            <button
                type="button"
                onClick={onClick}
                className={cn(
                    'flex w-full items-center gap-2 rounded-xl p-2 text-left transition',
                    active ? 'bg-primary/15' : 'hover:bg-secondary/5',
                )}
            >
                <span
                    className="mt-0.5 size-3 shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                />
                <span className="min-w-0 flex-1">
                    <span className="text-secondary block truncate text-sm font-semibold">
                        {title}
                    </span>
                    <span className="text-secondary/50 block truncate text-xs">{subtitle}</span>
                </span>
            </button>
        </li>
    )
}

export function MapItemList({ actors, events, selected, onFocus }) {
    const total = actors.length + events.length

    if (total === 0) {
        return <p className="text-secondary/50 p-4 text-sm">Nenhum item encontrado.</p>
    }

    return (
        <ul className="flex flex-col gap-1">
            {actors.map((actor) => (
                <Row
                    key={`ator-${actor.id}`}
                    color={actor.color}
                    title={actor.name}
                    subtitle={labelForType(actor.type)}
                    active={selected?.type === 'ator' && selected.id === actor.id}
                    onClick={() => onFocus('ator', actor)}
                />
            ))}
            {events.map((event) => (
                <Row
                    key={`evento-${event.id}`}
                    color={EVENT_COLOR}
                    title={event.title}
                    subtitle="Evento"
                    active={selected?.type === 'evento' && selected.id === event.id}
                    onClick={() => onFocus('evento', event)}
                />
            ))}
        </ul>
    )
}
