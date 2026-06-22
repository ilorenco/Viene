package com.viene.question.dto;

import com.viene.common.PortugueseDates;
import com.viene.question.Question;

public record QuestionResponse(
        Long id,
        String question,
        String userName,
        String userEmail,
        String status,
        String answer,
        String createdAt,
        String answeredAt) {

    public static QuestionResponse from(Question question) {
        boolean answered = question.getAnswer() != null;
        String userName = question.getAskedBy() != null ? question.getAskedBy().getName() : "Usuário removido";
        String userEmail = question.getAskedBy() != null ? question.getAskedBy().getEmail() : "";

        return new QuestionResponse(
                question.getId(),
                question.getQuestion(),
                userName,
                userEmail,
                answered ? "respondida" : "pendente",
                question.getAnswer(),
                PortugueseDates.displayDate(question.getCreatedAt().toLocalDate()),
                question.getAnsweredAt() != null
                        ? PortugueseDates.displayDate(question.getAnsweredAt().toLocalDate())
                        : null);
    }
}
