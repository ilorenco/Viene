package com.viene.approval;

import com.viene.actor.ActorService;
import com.viene.approval.dto.ApprovalItemResponse;
import com.viene.approval.dto.ModerationCommentRequest;
import com.viene.approval.dto.ModerationDecisionRequest;
import com.viene.event.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApprovalService {

    private final ActorService actorService;
    private final EventService eventService;

    public List<ApprovalItemResponse> findAll() {
        List<ApprovalItemResponse> items = new ArrayList<>();
        actorService.findSubmissions().forEach(actor -> items.add(ApprovalItemResponse.fromActor(actor)));
        eventService.findSubmissions().forEach(event -> items.add(ApprovalItemResponse.fromEvent(event)));
        items.sort(Comparator.comparing(ApprovalItemResponse::date).reversed());
        return items;
    }

    public void decideActor(Long id, ModerationDecisionRequest request) {
        actorService.decide(id, request.approved(), request.comment());
    }

    public void decideEvent(Long id, ModerationDecisionRequest request) {
        eventService.decide(id, request.approved(), request.comment());
    }

    public void addComment(ModerationCommentRequest request) {
        if ("ator".equals(request.type())) {
            actorService.addModerationComment(request.targetId(), request.comment());
        } else {
            eventService.addModerationComment(request.targetId(), request.comment());
        }
    }
}
