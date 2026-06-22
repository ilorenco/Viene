package com.viene.ticket.dto;

import com.viene.ticket.Ticket;

public record TicketResponse(Long id, Long eventId) {

    public static TicketResponse from(Ticket ticket) {
        return new TicketResponse(ticket.getId(), ticket.getEvent().getId());
    }
}
