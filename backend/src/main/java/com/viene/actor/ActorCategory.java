package com.viene.actor;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ActorCategory {
    AMBIENTES,
    PRIVADO,
    EDUCACAO,
    PUBLICO;

    @JsonValue
    public String toJson() {
        return name().toLowerCase();
    }
}
