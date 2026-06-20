// Regra de filtro do catálogo de atores, separada da tela. Reaproveita o useActors
// (useSuspenseQuery), então suspende junto. Filtra por ÁREA + BUSCA (nome/cidade/
// área) e devolve { items, tagOptions }: a lista final (com o filtro de TAG já
// aplicado) e as tags disponíveis (com contagem) calculadas a partir da base.

import { useActors } from '@/features/actors/hooks/useActors'
import { ATOR_AREA_LABELS } from '@/lib/atorTypes'

export function useFilteredActors(area, tag, search) {
    const actors = useActors()
    const term = search.trim().toLowerCase()

    // Base: filtra por ÁREA + BUSCA. É daqui que saem as tags disponíveis.
    const base = actors.filter(
        (actor) =>
            (area === 'todos' || actor.category === area) &&
            (term === '' ||
                actor.name.toLowerCase().includes(term) ||
                (actor.city || '').toLowerCase().includes(term) ||
                (ATOR_AREA_LABELS[actor.category] || '').toLowerCase().includes(term)),
    )

    // Tags disponíveis (com contagem) a partir da base, da mais comum para a menos.
    const tagCounts = new Map()
    for (const actor of base) {
        if (actor.tags) tagCounts.set(actor.tags, (tagCounts.get(actor.tags) ?? 0) + 1)
    }
    const tagOptions = [...tagCounts.entries()]
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count)

    // Filtro final: base + TAG.
    const items = tag === 'todas' ? base : base.filter((actor) => actor.tags === tag)

    return { items, tagOptions }
}
