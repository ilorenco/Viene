package com.viene.event;

import com.viene.event.dto.EventResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/eventos")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping
    public List<EventResponse> findAll() {
        return eventService.findAll().stream().map(EventResponse::from).toList();
    }

    @GetMapping("/{id}")
    public EventResponse findById(@PathVariable Long id) {
        return EventResponse.from(eventService.findById(id));
    }
}
