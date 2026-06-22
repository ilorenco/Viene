package com.viene.common;

import java.time.LocalDate;
import java.time.LocalTime;

public final class PortugueseDates {

    private static final String[] MONTHS = {
            "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    };

    private PortugueseDates() {
    }

    public static String displayDate(LocalDate date) {
        return "%02d %s. %d".formatted(date.getDayOfMonth(), MONTHS[date.getMonthValue() - 1], date.getYear());
    }

    public static String formatTime(LocalTime time) {
        return time != null ? "%02d:%02d".formatted(time.getHour(), time.getMinute()) : "—";
    }
}
