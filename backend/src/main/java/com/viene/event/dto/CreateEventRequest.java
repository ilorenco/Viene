package com.viene.event.dto;

import com.viene.event.EventCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;

public record CreateEventRequest(
        @NotBlank(message = "O nome do evento é obrigatório.") String title,
        @NotBlank(message = "O endereço é obrigatório.") String address,
        @NotNull(message = "A data é obrigatória.") LocalDate date,
        @NotNull(message = "O horário de início é obrigatório.") LocalTime start,
        @NotNull(message = "O horário de término é obrigatório.") LocalTime end,
        @NotNull(message = "O tipo de evento é obrigatório.") EventCategory category,
        String description,
        String ticketUrl,
        double[] position,
        String image) {
}
