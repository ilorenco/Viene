package com.viene.publication;

import com.viene.actor.Actor;
import com.viene.actor.ActorService;
import com.viene.event.Event;
import com.viene.event.EventService;
import com.viene.publication.dto.ActorPublicationResponse;
import com.viene.publication.dto.EventPublicationResponse;
import com.viene.publication.dto.MyPublicationsResponse;
import com.viene.publication.dto.UpdateActorRequest;
import com.viene.publication.dto.UpdateEventRequest;
import com.viene.user.Role;
import com.viene.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PublicationService {

    private final ActorService actorService;
    private final EventService eventService;
    private final ActorEventLinkRepository actorEventLinkRepository;

    public MyPublicationsResponse findMine(User user) {
        List<ActorPublicationResponse> actors = actorService.findMyPublications(user).stream()
                .map(actor -> ActorPublicationResponse.from(actor, linkedEventIds(actor)))
                .toList();
        List<EventPublicationResponse> events = eventService.findMyPublications(user).stream()
                .map(event -> EventPublicationResponse.from(event, linkedActorIds(event)))
                .toList();
        return new MyPublicationsResponse(actors, events);
    }

    @Transactional
    public ActorPublicationResponse updateActor(Long id, UpdateActorRequest request, User user) {
        Actor actor = actorService.findById(id);
        assertOwner(actor.getSubmittedBy(), user);
        Actor updated = actorService.update(id, request);
        syncActorLinks(updated, request.linkedEventIds(), user);
        return ActorPublicationResponse.from(updated, linkedEventIds(updated));
    }

    @Transactional
    public EventPublicationResponse updateEvent(Long id, UpdateEventRequest request, User user) {
        Event event = eventService.findById(id);
        assertOwner(event.getSubmittedBy(), user);
        Event updated = eventService.update(id, request);
        syncEventLinks(updated, request.linkedActorIds(), user);
        return EventPublicationResponse.from(updated, linkedActorIds(updated));
    }

    private void assertOwner(User owner, User user) {
        boolean isOwner = owner != null && owner.getId().equals(user.getId());
        if (!isOwner && user.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Você só pode editar suas próprias publicações.");
        }
    }

    private void syncActorLinks(Actor actor, List<Long> eventIds, User user) {
        actorEventLinkRepository.deleteAllByActor(actor);
        // Sem o flush, o Hibernate ordena os INSERTs antes dos DELETEs no commit
        // da transação — reinserir o mesmo par (actor, event) violaria a unique
        // constraint contra a linha antiga, ainda presente no banco.
        actorEventLinkRepository.flush();
        if (eventIds == null) {
            return;
        }
        for (Long eventId : eventIds) {
            Event event = eventService.findById(eventId);
            if (event.getSubmittedBy() != null && event.getSubmittedBy().getId().equals(user.getId())) {
                actorEventLinkRepository.save(ActorEventLink.builder().actor(actor).event(event).build());
            }
        }
    }

    private void syncEventLinks(Event event, List<Long> actorIds, User user) {
        actorEventLinkRepository.deleteAllByEvent(event);
        actorEventLinkRepository.flush();
        if (actorIds == null) {
            return;
        }
        for (Long actorId : actorIds) {
            Actor actor = actorService.findById(actorId);
            if (actor.getSubmittedBy() != null && actor.getSubmittedBy().getId().equals(user.getId())) {
                actorEventLinkRepository.save(ActorEventLink.builder().actor(actor).event(event).build());
            }
        }
    }

    private List<Long> linkedEventIds(Actor actor) {
        return actorEventLinkRepository.findByActor(actor).stream()
                .map(link -> link.getEvent().getId())
                .toList();
    }

    private List<Long> linkedActorIds(Event event) {
        return actorEventLinkRepository.findByEvent(event).stream()
                .map(link -> link.getActor().getId())
                .toList();
    }
}
