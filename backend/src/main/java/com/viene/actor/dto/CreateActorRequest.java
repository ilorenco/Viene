package com.viene.actor.dto;

import com.viene.actor.ActorType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateActorRequest(
        @NotBlank(message = "O nome é obrigatório.") String name,
        @NotBlank(message = "O endereço é obrigatório.") String address,
        @NotNull(message = "O tipo de ator é obrigatório.") ActorType type,
        double[] position,
        String description,
        String tags,
        String website,
        String email,
        String phone) {
}
