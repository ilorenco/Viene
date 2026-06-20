// Regra de filtro do catálogo de eventos, separada da tela. Reaproveita o useEvents
// (useSuspenseQuery), então suspende junto. Filtra por CATEGORIA (Set compartilhado
// com o Mapa) + BUSCA (título/endereço) + PERÍODO (datas). Devolve { items, all }:
// a lista filtrada e a lista COMPLETA (o EventDateFilter precisa de todos os
// eventos para montar o calendário, por isso devolvemos as duas).

import { useEvents } from '@/features/events/hooks/useEvents'

export function useFilteredEvents(selected, search, period) {
    const all = useEvents()
    const term = search.trim().toLowerCase()

    const items = all.filter(
        (event) =>
            selected.has(event.category) &&
            (term === '' ||
                event.title.toLowerCase().includes(term) ||
                (event.address || '').toLowerCase().includes(term)) &&
            (!period.from || event.date >= period.from) &&
            (!period.to || event.date <= period.to),
    )

    return { items, all }
}
