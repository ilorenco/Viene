package com.viene.publication.dto;

import com.viene.common.ModerationStatus;
import com.viene.common.PortugueseDates;
import com.viene.event.Event;
import com.viene.event.EventCategory;

import java.time.LocalDate;
import java.util.List;

public record EventPublicationResponse(
        Long id,
        String title,
        LocalDate date,
        String start,
        String end,
        EventCategory category,
        String datetime,
        String address,
        String description,
        String policies,
        String ticketUrl,
        String image,
        double[] position,
        String status,
        List<Long> linkedActorIds) {

    public static EventPublicationResponse from(Event event, List<Long> linkedActorIds) {
        String displayDate = PortugueseDates.displayDate(event.getDate());
        String start = PortugueseDates.formatTime(event.getStart());
        String end = PortugueseDates.formatTime(event.getEnd());
        String datetime = "%s - %s > %s - %s".formatted(start, displayDate, end, displayDate);
        boolean hasPosition = event.getLatitude() != null && event.getLongitude() != null;
        String status = event.getStatus() == ModerationStatus.APROVADO ? "ativo" : "bloqueado";

        return new EventPublicationResponse(
                event.getId(),
                event.getTitle(),
                event.getDate(),
                start,
                end,
                event.getCategory(),
                datetime,
                event.getAddress(),
                event.getDescription(),
                event.getPolicies(),
                event.getTicketUrl(),
                event.getImage(),
                hasPosition ? new double[] { event.getLatitude(), event.getLongitude() } : null,
                status,
                linkedActorIds);
    }
}
