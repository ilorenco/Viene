package com.viene.publication;

import com.viene.actor.Actor;
import com.viene.event.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActorEventLinkRepository extends JpaRepository<ActorEventLink, Long> {

    List<ActorEventLink> findByActor(Actor actor);

    List<ActorEventLink> findByEvent(Event event);

    void deleteAllByActor(Actor actor);

    void deleteAllByEvent(Event event);
}
