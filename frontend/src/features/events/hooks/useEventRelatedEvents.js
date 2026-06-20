// Regra de "eventos relacionados" a um EVENTO. Reaproveita o useEvents
// (useSuspenseQuery), então suspende junto com a seção. Relacionado = eventos da
// mesma categoria (menos ele mesmo); se nenhum, mostra outros eventos. Máx 4.

import { useEvents } from '@/features/events/hooks/useEvents'

export function useEventRelatedEvents(event) {
    const events = useEvents()

    const sameCategory = events.filter(
        (item) => item.id !== event.id && item.category === event.category,
    )
    const others = events.filter((item) => item.id !== event.id)

    return (sameCategory.length ? sameCategory : others).slice(0, 4)
}
