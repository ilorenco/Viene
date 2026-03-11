package com.joinvalle.backend.services;

import com.joinvalle.backend.models.EventModel;
import com.joinvalle.backend.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public EventModel create(EventModel event) {
        return eventRepository.save(event);
    }
}
