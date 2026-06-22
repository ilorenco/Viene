package com.viene.publication.dto;

import com.viene.event.EventCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record UpdateEventRequest(
        @NotBlank(message = "O nome do evento é obrigatório.") String title,
        @NotNull(message = "O tipo de evento é obrigatório.") EventCategory category,
        @NotBlank(message = "O endereço é obrigatório.") String address,
        @NotNull(message = "A data é obrigatória.") LocalDate date,
        LocalTime start,
        LocalTime end,
        String description,
        String ticketUrl,
        List<Long> linkedActorIds) {
}
