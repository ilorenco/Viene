package com.viene.publication.dto;

import com.viene.actor.ActorType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record UpdateActorRequest(
        @NotBlank(message = "O nome é obrigatório.") String name,
        @NotNull(message = "O tipo de ator é obrigatório.") ActorType type,
        @NotBlank(message = "O endereço é obrigatório.") String address,
        String description,
        String website,
        String email,
        String phone,
        List<Long> linkedEventIds) {
}
