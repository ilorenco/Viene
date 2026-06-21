package com.viene.report.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateReportRequest(
        @NotBlank(message = "O tipo (ator/evento) é obrigatório.") String type,
        @NotNull(message = "O id do item é obrigatório.") Long targetId,
        @NotBlank(message = "A justificativa é obrigatória.") String reason) {
}
