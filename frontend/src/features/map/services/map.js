// Serviço do Mapa Interativo (atores georreferenciados + eventos no mapa).
// Mock por enquanto (ver mockDelay); quando a API existir, trocar pelo cliente HTTP.
//   GET  /map         -> pontos do mapa (atores, com coordenadas)
//   GET  /map/eventos -> eventos georreferenciados
//   POST /map         -> sugerir um novo ponto (moderação - RN_003)

import { mockActors } from '@/features/actors/mocks/actors'
import { mockMapEvents } from '@/features/map/mocks/mapEvents'
import { mockDelay } from '@/mocks/delay'

export async function listInnovationUnits() {
    await mockDelay()
    // Mesma lista do catálogo de Atores (cada ator já vem com position).
    return mockActors
}

export async function listMapEvents() {
    await mockDelay()
    return mockMapEvents
}

// Sugere um novo ponto no mapa. RN_003: entra como pendente e passa pela
// moderação de um administrador antes de aparecer publicamente.
export async function suggestPoint(data) {
    await mockDelay()
    return { id: Date.now(), ...data, status: 'pendente' }
}
