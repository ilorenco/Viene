// Regra de "quem aparece no mapa", separada da tela. Reaproveita o useMapData
// (useSuspenseQueries), então suspende junto. Recebe o estado dos filtros e devolve
// { actors, events, visibleActors, visibleEvents }: as listas completas (p/ achar o
// item selecionado e p/ o filtro de data) e as filtradas (o que vai virar marcador).
//
// Cada ator já sai com a `color` do seu tipo. Este hook NÃO conhece a biblioteca de
// mapa — devolve apenas listas de itens com { id, name, position: [lat, lng], ... }.

import { useMemo } from 'react'

import { useMapData } from '@/features/map/hooks/useMapData'
import { colorForType } from '@/lib/atorTypes'

export function useMapMarkers({
    showActors,
    showEvents,
    enabledTypes,
    enabledCats,
    searchTerm,
    eventRange,
}) {
    const { actors: actorsRaw, events } = useMapData()
    const term = searchTerm.trim().toLowerCase()

    // Atores com a cor do tipo (a cor do marcador no mapa).
    const actors = useMemo(
        () => actorsRaw.map((actor) => ({ ...actor, color: colorForType(actor.type) })),
        [actorsRaw],
    )

    const visibleActors = useMemo(
        () =>
            showActors
                ? actors.filter(
                      (actor) =>
                          enabledTypes.has(actor.type) &&
                          (term === '' || actor.name.toLowerCase().includes(term)),
                  )
                : [],
        [actors, showActors, enabledTypes, term],
    )

    const visibleEvents = useMemo(
        () =>
            showEvents
                ? events.filter(
                      (event) =>
                          enabledCats.has(event.category) &&
                          (term === '' || event.title.toLowerCase().includes(term)) &&
                          (!eventRange.from || event.date >= eventRange.from) &&
                          (!eventRange.to || event.date <= eventRange.to),
                  )
                : [],
        [events, showEvents, enabledCats, term, eventRange],
    )

    return { actors, events, visibleActors, visibleEvents }
}
