package com.viene.user;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    ADMIN,
    USUARIO,
    ATOR;

    @JsonValue
    public String toJson() {
        return name().toLowerCase();
    }
}
