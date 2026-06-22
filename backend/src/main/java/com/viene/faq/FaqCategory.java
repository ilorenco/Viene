package com.viene.faq;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum FaqCategory {
    MAPA,
    EVENTOS,
    ATORES,
    CONTA,
    FAVORITOS,
    ACESSIBILIDADE,
    GERAL;

    @JsonValue
    public String toJson() {
        return name().toLowerCase();
    }

    @JsonCreator
    public static FaqCategory fromJson(String value) {
        return FaqCategory.valueOf(value.toUpperCase());
    }
}
