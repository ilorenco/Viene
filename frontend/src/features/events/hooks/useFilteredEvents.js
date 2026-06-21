// Regra de filtro do catálogo de eventos, separada da tela. Filtra por
// CATEGORIA (Set compartilhado com o Mapa) + BUSCA (título/endereço) +
// PERÍODO (datas). Devolve { items, all }: a lista filtrada e a lista
// COMPLETA (o EventDateFilter precisa de todos os eventos para montar o
// calendário, por isso devolvemos as duas).
//
// `filterEvents` é a regra pura (recebe a lista, não busca nada) — reusada
// tanto pelo catálogo completo (useFilteredEvents) quanto pelos favoritos
// (useFilteredFavoriteEvents, ver features/favorites).

import { useEvents } from '@/features/events/hooks/useEvents'
import { useFavoriteEvents } from '@/features/favorites/hooks/useFavoriteEvents'

export function filterEvents(all, selected, search, period) {
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

export function useFilteredEvents(selected, search, period) {
    const all = useEvents()
    return filterEvents(all, selected, search, period)
}

export function useFilteredFavoriteEvents(selected, search, period) {
    const all = useFavoriteEvents()
    return filterEvents(all, selected, search, period)
}
