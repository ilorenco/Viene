package com.viene.approval.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ModerationCommentRequest(
        @NotNull(message = "O id do item é obrigatório.") Long targetId,
        @NotBlank(message = "O tipo (ator/evento) é obrigatório.") String type,
        @NotBlank(message = "O comentário é obrigatório.") String comment) {
}
