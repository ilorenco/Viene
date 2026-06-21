package com.viene.event.dto;

import com.viene.event.Event;
import com.viene.event.EventCategory;

import java.time.LocalDate;
import java.time.LocalTime;

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
        String image) {

    private static final String[] MONTHS = {
            "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    };

    public static EventResponse from(Event event) {
        String displayDate = displayDate(event.getDate());
        String start = formatTime(event.getStart());
        String end = formatTime(event.getEnd());
        String datetime = "%s - %s > %s - %s".formatted(start, displayDate, end, displayDate);

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
                event.getImage());
    }

    private static String displayDate(LocalDate date) {
        return "%02d %s. %d".formatted(date.getDayOfMonth(), MONTHS[date.getMonthValue() - 1], date.getYear());
    }

    private static String formatTime(LocalTime time) {
        return "%02d:%02d".formatted(time.getHour(), time.getMinute());
    }
}
