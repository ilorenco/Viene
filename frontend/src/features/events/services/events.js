// Serviço de Eventos.
//
// Estilo da branch do colega: cada função espera um mockDelay() e devolve o mock,
// sem o ramo duplo USE_MOCKS/http.js. Quando a API REST existir, basta trocar o
// CORPO de cada função por uma chamada real — as telas (que só falam com os hooks)
// não mudam. Formato de cada evento: ver src/mocks/events.js.
//   GET /eventos        -> lista de eventos
//   GET /eventos/{id}   -> detalhe de um evento

import { mockEvents } from '@/features/events/mocks/events'
import { mockDelay } from '@/mocks/delay'

export async function listEvents() {
    await mockDelay()
    return mockEvents
}

export async function getEventById(id) {
    await mockDelay()
    return mockEvents.find((event) => String(event.id) === String(id)) ?? null
}
