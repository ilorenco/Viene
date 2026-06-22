package com.viene.question.dto;

import jakarta.validation.constraints.NotBlank;

public record AnswerQuestionRequest(@NotBlank(message = "A resposta é obrigatória.") String answer) {
}
