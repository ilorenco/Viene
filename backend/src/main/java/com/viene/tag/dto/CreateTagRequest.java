package com.viene.tag.dto;

import com.viene.tag.TagKind;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateTagRequest(
        @NotBlank(message = "O label da tag é obrigatório.") String label,
        @NotNull(message = "O tipo da tag (kind) é obrigatório.") TagKind kind) {
}
