// Serviço de Atores (agentes do ecossistema de inovação).
//
// Estilo da branch do colega: cada função espera um mockDelay() e devolve o mock,
// sem o ramo duplo USE_MOCKS/http.js. Quando a API REST existir, basta trocar o
// CORPO de cada função por uma chamada real — as telas (que só falam com os hooks,
// nunca com este arquivo direto) não mudam. Formato de cada ator: ver
// src/mocks/actors.js.
//
// Endpoint real (ver ActorController, prefixo /atores):
//   GET    /atores        -> lista de atores
//   GET    /atores/{id}   -> detalhe de um ator
//   DELETE /atores/{id}   -> remove um ator (admin)

import { mockActors } from '@/features/actors/mocks/actors'
import { mockDelay } from '@/mocks/delay'

export async function listActors() {
    await mockDelay()
    return mockActors
}

export async function getActorById(id) {
    await mockDelay()
    return mockActors.find((actor) => String(actor.id) === String(id)) ?? null
}

// Remove um ator (ação de admin). Hoje só simula; stub pronto para virar
// DELETE /atores/{id} quando a API existir (ainda não há UI que chame isto).
export async function deleteActor(id) {
    await mockDelay()
    return { id, deleted: true }
}
