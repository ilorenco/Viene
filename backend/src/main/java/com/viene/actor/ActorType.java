package com.viene.actor;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ActorType {
    // ActorCategory.AMBIENTES
    HUB,
    INCUBADORA,
    COWORKING,
    PARQUE,
    MAKER,
    // ActorCategory.PRIVADO
    STARTUP,
    SPINOFF,
    CORPORACAO,
    SOFTWAREHOUSE,
    MPE,
    // ActorCategory.EDUCACAO
    IES,
    TECNICO,
    PD,
    // ActorCategory.PUBLICO
    GOVERNO,
    ASSOCIACAO,
    FOMENTO,
    VC,
    ANJO;

    @JsonValue
    public String toJson() {
        return name().toLowerCase();
    }

    @JsonCreator
    public static ActorType fromJson(String value) {
        return ActorType.valueOf(value.toUpperCase());
    }

    public ActorCategory category() {
        return switch (this) {
            case HUB, INCUBADORA, COWORKING, PARQUE, MAKER -> ActorCategory.AMBIENTES;
            case STARTUP, SPINOFF, CORPORACAO, SOFTWAREHOUSE, MPE -> ActorCategory.PRIVADO;
            case IES, TECNICO, PD -> ActorCategory.EDUCACAO;
            case GOVERNO, ASSOCIACAO, FOMENTO, VC, ANJO -> ActorCategory.PUBLICO;
        };
    }
}
