package com.viene.favorite.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateFavoriteRequest(
        @NotBlank(message = "O tipo (ator/evento) é obrigatório.") String type,
        @NotNull(message = "O id do item é obrigatório.") Long targetId) {
}
