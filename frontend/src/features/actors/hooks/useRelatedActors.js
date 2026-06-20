// Regra de "atores relacionados", separada da tela (antes ficava dentro do
// componente RelatedActors da página). Reaproveita o useActors (useSuspenseQuery),
// então suspende junto com a seção. Relacionado = mesma área (category) ou mesma
// tag, menos ele mesmo; no máximo 6.

import { useActors } from '@/features/actors/hooks/useActors'

export function useRelatedActors(actor) {
    const actors = useActors()

    return actors
        .filter(
            (item) =>
                item.id !== actor.id &&
                (item.category === actor.category || (actor.tags && item.tags === actor.tags)),
        )
        .slice(0, 6)
}
