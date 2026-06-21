package com.viene.actor;

import com.viene.actor.dto.ActorResponse;
import com.viene.actor.dto.CreateActorRequest;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/atores")
@RequiredArgsConstructor
public class ActorController {

    private final ActorService actorService;

    @GetMapping
    public List<ActorResponse> findAll() {
        return actorService.findAllApproved().stream().map(ActorResponse::from).toList();
    }

    @GetMapping("/{id}")
    public ActorResponse findById(@PathVariable Long id) {
        return ActorResponse.from(actorService.findApprovedById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ActorResponse create(@Valid @RequestBody CreateActorRequest request, @AuthenticationPrincipal User user) {
        return ActorResponse.from(actorService.create(request, user));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        actorService.delete(id);
    }
}
