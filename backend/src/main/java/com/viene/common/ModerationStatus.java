package com.viene.common;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ModerationStatus {
    PENDENTE,
    APROVADO,
    REJEITADO;

    @JsonValue
    public String toJson() {
        return name().toLowerCase();
    }
}
