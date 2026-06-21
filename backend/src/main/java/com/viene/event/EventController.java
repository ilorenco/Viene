package com.viene.event;

import com.viene.event.dto.CreateEventRequest;
import com.viene.event.dto.EventResponse;
import com.viene.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/eventos")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping
    public List<EventResponse> findAll() {
        return eventService.findAllApproved().stream().map(EventResponse::from).toList();
    }

    @GetMapping("/{id}")
    public EventResponse findById(@PathVariable Long id) {
        return EventResponse.from(eventService.findApprovedById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EventResponse create(@Valid @RequestBody CreateEventRequest request, @AuthenticationPrincipal User user) {
        return EventResponse.from(eventService.create(request, user));
    }
}
