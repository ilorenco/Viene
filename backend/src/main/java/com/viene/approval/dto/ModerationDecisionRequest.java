package com.viene.approval.dto;

import jakarta.validation.constraints.NotNull;

public record ModerationDecisionRequest(
        @NotNull(message = "É preciso informar se foi aprovado ou rejeitado.") Boolean approved,
        String comment) {
}
