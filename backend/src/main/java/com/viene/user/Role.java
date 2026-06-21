package com.viene.user;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    ADMIN,
    USUARIO;

    @JsonValue
    public String toJson() {
        return name().toLowerCase();
    }
}
