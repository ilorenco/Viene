package com.viene.question;

import com.viene.question.dto.AnswerQuestionRequest;
import com.viene.question.dto.CreateQuestionRequest;
import com.viene.question.dto.QuestionResponse;
import com.viene.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    // Lista só as MINHAS perguntas (não confundir com /admin/perguntas, que
    // lista de todo mundo e exige ADMIN).
    @GetMapping("/ajuda/perguntas")
    public List<QuestionResponse> findMine(@AuthenticationPrincipal User user) {
        return questionService.findMine(user).stream().map(QuestionResponse::from).toList();
    }

    @PostMapping("/ajuda/perguntas")
    @ResponseStatus(HttpStatus.CREATED)
    public QuestionResponse create(@Valid @RequestBody CreateQuestionRequest request, @AuthenticationPrincipal User user) {
        return QuestionResponse.from(questionService.create(request, user));
    }

    @GetMapping("/admin/perguntas")
    @PreAuthorize("hasRole('ADMIN')")
    public List<QuestionResponse> findAll() {
        return questionService.findAll().stream().map(QuestionResponse::from).toList();
    }

    @PutMapping("/admin/perguntas/{id}/responder")
    @PreAuthorize("hasRole('ADMIN')")
    public QuestionResponse answer(@PathVariable Long id, @Valid @RequestBody AnswerQuestionRequest request) {
        return QuestionResponse.from(questionService.answer(id, request.answer()));
    }

    @DeleteMapping("/admin/perguntas/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        questionService.delete(id);
    }
}
