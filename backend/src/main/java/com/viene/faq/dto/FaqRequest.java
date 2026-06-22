package com.viene.faq.dto;

import com.viene.faq.FaqCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record FaqRequest(
        @NotNull(message = "A categoria é obrigatória.") FaqCategory category,
        @NotBlank(message = "A pergunta é obrigatória.") String question,
        @NotBlank(message = "A resposta é obrigatória.") String answer) {
}
