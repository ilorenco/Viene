// Conta quantos atores/eventos usam uma tag/categoria — só para o feedback ao
// remover uma tag (mostra a relação que o back-end vai cascatear). Mantém a regra
// (e a dependência dos mocks) fora dos componentes do admin.

import { mockActors } from '@/features/actors/mocks/actors'
import { mockEvents } from '@/features/events/mocks/events'

export function countTagUsage(kind, label) {
    if (kind === 'ator') return mockActors.filter((actor) => actor.tags === label).length
    return mockEvents.filter((event) => (event.tags || event.category) === label).length
}
