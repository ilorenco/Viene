package com.viene.actor;

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
}
