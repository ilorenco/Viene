// Regra de negócio da seção "Explore!" da Home: filtra por cidade e ordena
// (recentes/antigos) os eventos e atores, limitando os atores a 12. Isola a lógica
// do componente apresentacional (mesma abordagem de useFilteredActors/useFilteredEvents).
// Busca os dados pelos hooks de leitura (useEvents/useActors -> React Query/Suspense).

import { useActors } from '@/features/actors/hooks/useActors'
import { useEvents } from '@/features/events/hooks/useEvents'

function matchesCity(value, city) {
    return city === 'todas' || (value || '').toLowerCase().includes(city.toLowerCase())
}

export function useExploreCarousels(sort, city) {
    const events = useEvents()
    const actors = useActors()

    const filteredEvents = [...events]
        .filter((event) => matchesCity(event.address, city))
        .sort((a, b) => {
            // Evento sem data (date: null) vira '' — evita quebrar o localeCompare
            // (que estourava e derrubava a Home ao ordenar por "mais antigos").
            const da = a.date || ''
            const db = b.date || ''
            return sort === 'recentes' ? db.localeCompare(da) : da.localeCompare(db)
        })

    const filteredActors = [...actors]
        .filter((actor) => matchesCity(actor.city, city))
        .sort((a, b) => {
            const fa = Number(a.founded) || 0
            const fb = Number(b.founded) || 0
            return sort === 'recentes' ? fb - fa : fa - fb
        })
        .slice(0, 12)

    return { events: filteredEvents, actors: filteredActors }
}
