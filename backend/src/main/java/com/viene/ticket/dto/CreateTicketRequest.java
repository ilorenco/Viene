package com.viene.ticket.dto;

import jakarta.validation.constraints.NotNull;

public record CreateTicketRequest(
        @NotNull(message = "O id do evento é obrigatório.") Long eventId) {
}
