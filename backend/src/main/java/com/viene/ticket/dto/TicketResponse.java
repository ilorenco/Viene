package com.viene.ticket.dto;

import com.viene.common.PortugueseDates;
import com.viene.event.Event;
import com.viene.ticket.Ticket;

import java.time.LocalDate;

public record TicketResponse(
        Long id,
        Long eventId,
        String eventTitle,
        LocalDate eventDate,
        String eventDatetime,
        String eventAddress) {

    public static TicketResponse from(Ticket ticket) {
        Event event = ticket.getEvent();
        String datetime = PortugueseDates.formatRange(event.getDate(), event.getStart(), event.getEnd());

        return new TicketResponse(
                ticket.getId(), event.getId(), event.getTitle(), event.getDate(), datetime, event.getAddress());
    }
}
