package com.viene.event.dto;

import com.viene.common.PortugueseDates;
import com.viene.event.Event;
import com.viene.event.EventCategory;

import java.time.LocalDate;

public record EventResponse(
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
        String price,
        String capacity,
        String image,
        double[] position) {

    public static EventResponse from(Event event) {
        String start = PortugueseDates.formatTime(event.getStart());
        String end = PortugueseDates.formatTime(event.getEnd());
        String datetime = PortugueseDates.formatRange(event.getDate(), event.getStart(), event.getEnd());
        boolean hasPosition = event.getLatitude() != null && event.getLongitude() != null;

        return new EventResponse(
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
                event.getPrice(),
                event.getCapacity(),
                event.getImage(),
                hasPosition ? new double[] { event.getLatitude(), event.getLongitude() } : null);
    }
}
