import { useActors } from '@/features/actors/hooks/useActors'

export function useFilteredActors(area, search) {
    const { data: actors } = useActors()
    const query = search.trim().toLowerCase()

    return actors.filter((actor) => {
        const matchesArea = area === 'todos' || actor.category === area
        const matchesQuery =
            query === '' ||
            [actor.name, actor.city, actor.neighborhood].some((field) =>
                (field ?? '').toLowerCase().includes(query),
            )
        return matchesArea && matchesQuery
    })
}
