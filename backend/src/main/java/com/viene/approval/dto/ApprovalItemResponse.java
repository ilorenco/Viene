package com.viene.approval.dto;

import com.viene.actor.Actor;
import com.viene.common.ModerationStatus;
import com.viene.common.PortugueseDates;
import com.viene.event.Event;
import com.viene.user.User;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ApprovalItemResponse(
        Long id,
        String type,
        String title,
        String submittedBy,
        String submitterType,
        boolean reviewed,
        String decision,
        LocalDate date,
        String submittedAt,
        String summary) {

    public static ApprovalItemResponse fromActor(Actor actor) {
        return build("ator", actor.getId(), actor.getName(), actor.getSubmittedBy(),
                actor.getStatus(), actor.getCreatedAt(), actor.getDescription());
    }

    public static ApprovalItemResponse fromEvent(Event event) {
        return build("evento", event.getId(), event.getTitle(), event.getSubmittedBy(),
                event.getStatus(), event.getCreatedAt(), event.getDescription());
    }

    private static ApprovalItemResponse build(
            String type, Long id, String title, User submittedBy,
            ModerationStatus status, LocalDateTime createdAt, String summary) {
        LocalDate date = createdAt.toLocalDate();
        String decision = switch (status) {
            case APROVADO -> "aprovado";
            case REJEITADO -> "rejeitado";
            case PENDENTE -> null;
        };

        return new ApprovalItemResponse(
                id,
                type,
                title,
                submittedBy.getName(),
                "usuario",
                status != ModerationStatus.PENDENTE,
                decision,
                date,
                PortugueseDates.displayDate(date),
                summary);
    }
}
