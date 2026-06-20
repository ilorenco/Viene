// Serviço do Mapa Interativo (atores georreferenciados + eventos no mapa).
//
// Estilo da branch do colega: cada função espera um mockDelay() e devolve o mock,
// sem o ramo duplo USE_MOCKS/http.js. Quando a API existir, troca-se o corpo.
//
// Endpoints reais (ver MapPointController, prefixo /map):
//   GET  /map          -> pontos do mapa (atores, com coordenadas)
//   GET  /map/eventos  -> eventos georreferenciados (a confirmar)
//   POST /map          -> sugerir um novo ponto (vai para moderação - RN_003)
//
// Observação: no back-end as coordenadas usam PostGIS; ao trocar para a API real,
// garanta que cada ponto chegue com position: [lat, lng].

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

// Sugere um novo ponto no mapa. RN_003: a sugestão entra como pendente e passa
// pela moderação de um administrador antes de aparecer publicamente.
export async function suggestPoint(data) {
    // data: { name, type, address, position, description, contact, tags, ... }
    await mockDelay()
    return { id: Date.now(), ...data, status: 'pendente' }
}
