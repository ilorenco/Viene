package com.viene.question.dto;

import jakarta.validation.constraints.NotBlank;

public record CreateQuestionRequest(@NotBlank(message = "A pergunta é obrigatória.") String question) {
}
