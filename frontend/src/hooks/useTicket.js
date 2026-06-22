// Hook de "ticket" de um evento (botão "Gerar Ticket"/"Cancelar Ticket" nos
// cards de evento). Consulta a lista crua dos MEUS ingressos (leve, só ids) pra
// saber se ESTE evento já tem ticket, e expõe `toggle()` pra gerar/cancelar —
// mesmo padrão do `useFavorite`.
//
// Sem login, `hasTicket` é sempre false e a consulta nem dispara.

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { useAuth } from '@/contexts/AuthContext'
import {
    cancelTicket,
    generateTicket,
    listMyTickets,
    TICKETS_KEY,
} from '@/features/tickets/services/tickets'

export function useTicket(eventId, enabled = true) {
    const { isAuthenticated } = useAuth()
    const queryClient = useQueryClient()

    const { data: tickets } = useQuery({
        queryKey: TICKETS_KEY,
        queryFn: listMyTickets,
        enabled: isAuthenticated && enabled,
    })

    const hasTicket =
        isAuthenticated && (tickets ?? []).some((ticket) => ticket.eventId === eventId)

    async function toggle() {
        if (hasTicket) {
            await cancelTicket(eventId)
        } else {
            await generateTicket(eventId)
        }
        queryClient.invalidateQueries({ queryKey: TICKETS_KEY })
    }

    return { hasTicket, toggle }
}
