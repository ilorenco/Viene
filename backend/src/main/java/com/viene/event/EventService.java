package com.viene.event;

import com.viene.common.ModerationStatus;
import com.viene.common.exception.ResourceNotFoundException;
import com.viene.event.dto.CreateEventRequest;
import com.viene.publication.dto.UpdateEventRequest;
import com.viene.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public List<Event> findAllApproved() {
        return eventRepository.findByStatus(ModerationStatus.APROVADO);
    }

    public Event findApprovedById(Long id) {
        Event event = findById(id);
        if (event.getStatus() != ModerationStatus.APROVADO) {
            throw new ResourceNotFoundException("Evento não encontrado: " + id);
        }
        return event;
    }

    public Event findById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Evento não encontrado: " + id));
    }

    public Event create(CreateEventRequest request, User submitter) {
        double[] position = request.position();

        Event event = Event.builder()
                .title(request.title())
                .address(request.address())
                .date(request.date())
                .start(request.start())
                .end(request.end())
                .category(request.category())
                .description(request.description())
                .ticketUrl(request.ticketUrl())
                .image(request.image())
                .latitude(position != null ? position[0] : null)
                .longitude(position != null ? position[1] : null)
                .status(ModerationStatus.PENDENTE)
                .submittedBy(submitter)
                .build();

        return eventRepository.save(event);
    }

    public List<Event> findSubmissions() {
        return eventRepository.findBySubmittedByIsNotNull();
    }

    public List<Event> findMyPublications(User user) {
        return eventRepository.findBySubmittedBy(user).stream()
                .filter(event -> event.getStatus() != ModerationStatus.PENDENTE)
                .toList();
    }

    public Event update(Long id, UpdateEventRequest request) {
        Event event = findById(id);
        event.setTitle(request.title());
        event.setCategory(request.category());
        event.setAddress(request.address());
        event.setDate(request.date());
        event.setStart(request.start());
        event.setEnd(request.end());
        event.setDescription(request.description());
        event.setTicketUrl(request.ticketUrl());
        event.setImage(request.image());
        return eventRepository.save(event);
    }

    public Event decide(Long id, boolean approved, String comment) {
        Event event = findById(id);
        event.setStatus(approved ? ModerationStatus.APROVADO : ModerationStatus.REJEITADO);
        if (comment != null && !comment.isBlank()) {
            event.setModerationComment(comment);
        }
        return eventRepository.save(event);
    }

    public Event addModerationComment(Long id, String comment) {
        Event event = findById(id);
        event.setModerationComment(comment);
        return eventRepository.save(event);
    }
}
