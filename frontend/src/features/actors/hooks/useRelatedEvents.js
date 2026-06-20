// Regra de "eventos relacionados", separada da tela (antes ficava dentro do
// componente RelatedEvents da página). Reaproveita o useEvents (useSuspenseQuery),
// então suspende junto com a seção. Relacionado = eventos na mesma cidade do ator
// (se não houver nenhum, mostra os primeiros eventos); no máximo 4.

import { useEvents } from '@/features/events/hooks/useEvents'

export function useRelatedEvents(actor) {
    const { data: events } = useEvents()
    const city = (actor.city || '').toLowerCase()
    const sameCity = events.filter(
        (event) => city && (event.address || '').toLowerCase().includes(city),
    )

    return (sameCity.length ? sameCity : events).slice(0, 4)
}
