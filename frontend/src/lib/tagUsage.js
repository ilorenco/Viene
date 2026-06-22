// Conta quantos atores/eventos usam uma tag/categoria — só para o feedback ao
// remover uma tag (mostra a relação que o back-end vai cascatear). Mantém a regra
// fora dos componentes do admin.

import { listActors } from '@/features/actors/services/actors'
import { listEvents } from '@/features/events/services/events'

export async function countTagUsage(kind, label) {
    if (kind === 'ator') {
        const actors = await listActors()
        return actors.filter((actor) => actor.tags === label).length
    }
    const events = await listEvents()
    return events.filter((event) => (event.tags || event.category) === label).length
}
