package com.viene.user;

import com.fasterxml.jackson.annotation.JsonValue;

public enum UserStatus {
    ATIVO,
    BLOQUEADO;

    @JsonValue
    public String toJson() {
        return name().toLowerCase();
    }
}
