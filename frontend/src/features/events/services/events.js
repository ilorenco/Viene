// Serviço de Eventos.
//
// Conectado à API real (ver EventController, prefixo /eventos):
//   GET /eventos        -> lista de eventos
//   GET /eventos/{id}   -> detalhe de um evento

import { ApiError, request } from '@/services/http'

export async function listEvents() {
    return request('/eventos')
}

// Evento inexistente devolve null (em vez de lançar), pra manter o mesmo
// contrato que a tela de detalhes (EventDetails) já espera.
export async function getEventById(id) {
    try {
        return await request(`/eventos/${id}`)
    } catch (error) {
        if (error instanceof ApiError && error.status === 404) return null
        throw error
    }
}
