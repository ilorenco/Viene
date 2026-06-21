package com.viene.approval;

import com.viene.approval.dto.ApprovalItemResponse;
import com.viene.approval.dto.ModerationCommentRequest;
import com.viene.approval.dto.ModerationDecisionRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class ApprovalController {

    private final ApprovalService approvalService;

    @GetMapping("/aprovacoes")
    public List<ApprovalItemResponse> findAll() {
        return approvalService.findAll();
    }

    @PutMapping("/atores/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void decideActor(@PathVariable Long id, @Valid @RequestBody ModerationDecisionRequest request) {
        approvalService.decideActor(id, request);
    }

    @PutMapping("/eventos/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void decideEvent(@PathVariable Long id, @Valid @RequestBody ModerationDecisionRequest request) {
        approvalService.decideEvent(id, request);
    }

    @PostMapping("/comentarios")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void addComment(@Valid @RequestBody ModerationCommentRequest request) {
        approvalService.addComment(request);
    }
}
