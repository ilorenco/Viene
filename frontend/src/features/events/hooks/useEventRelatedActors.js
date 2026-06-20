// Regra de "atores relacionados" a um EVENTO. Reaproveita o useActors
// (useSuspenseQuery), então suspende junto com a seção. Relacionado = atores cuja
// cidade aparece no endereço do evento; se nenhum casar, mostra os primeiros. Máx 6.

import { useActors } from '@/features/actors/hooks/useActors'

export function useEventRelatedActors(event) {
    const actors = useActors()
    const address = (event.address || '').toLowerCase()

    const sameCity = actors.filter(
        (actor) => actor.city && address.includes(actor.city.toLowerCase()),
    )

    return (sameCity.length ? sameCity : actors).slice(0, 6)
}
