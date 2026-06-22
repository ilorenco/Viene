// Serviço de Ingressos (gerar/cancelar um ticket pra um evento).
//
// Conectado à API real (ver TicketController, prefixo /usuarios/me/ingressos):
//   GET    /usuarios/me/ingressos           -> [{id, eventId, eventTitle, eventDate,
//                                               eventDatetime, eventAddress}] do usuário logado
//   POST   /usuarios/me/ingressos           -> gera {eventId}
//   DELETE /usuarios/me/ingressos/{eventId} -> cancela

import { request } from '@/services/http'

export const TICKETS_KEY = ['tickets']

export async function listMyTickets() {
    return request('/usuarios/me/ingressos')
}

export async function generateTicket(eventId) {
    return request('/usuarios/me/ingressos', { method: 'POST', body: { eventId } })
}

export async function cancelTicket(eventId) {
    return request(`/usuarios/me/ingressos/${eventId}`, { method: 'DELETE' })
}
