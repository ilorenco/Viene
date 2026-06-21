package com.viene.tag;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TagKind {
    ATOR,
    EVENTO;

    @JsonValue
    public String toJson() {
        return name().toLowerCase();
    }

    @JsonCreator
    public static TagKind fromJson(String value) {
        return TagKind.valueOf(value.toUpperCase());
    }
}
