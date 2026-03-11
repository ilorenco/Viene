package com.joinvalle.backend.services;

import com.joinvalle.backend.models.EventModel;
import com.joinvalle.backend.models.ProfileModel;
import com.joinvalle.backend.repositories.ActorRepository;
import com.joinvalle.backend.repositories.EventRepository;
import com.joinvalle.backend.repositories.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AdminService {

    @Autowired
    private EventRepository eventRepo;

    @Autowired
    private ProfileRepository profileRepo;

    @Autowired
    private ActorRepository actorRepository;

    public Map<String, List<?>> getPendingContent() {
        Map<String, List<?>> pending = new HashMap<>();
        pending.put("events", eventRepo.findByApprovedFalseAndRejectedFalse());
        pending.put("profiles", profileRepo.findByApprovedFalseAndRejectedFalse());
        return pending;
    }

    public boolean approveEvent(Long id) {
        Optional<EventModel> optional = eventRepo.findById(id);
        if (optional.isEmpty()) return false;

        EventModel event = optional.get();
        event.setApproved(true);
        event.setRejected(false);
        eventRepo.save(event);
        return true;
    }

    public boolean rejectEvent(Long id) {
        Optional<EventModel> optional = eventRepo.findById(id);
        if (optional.isEmpty()) return false;

        EventModel event = optional.get();
        event.setApproved(false);
        event.setRejected(true);
        eventRepo.save(event);
        return true;
    }

    public boolean approveProfile(Long id) {
        Optional<ProfileModel> optional = profileRepo.findById(id);
        if (optional.isEmpty()) return false;

        ProfileModel profile = optional.get();
        profile.setApproved(true);
        profile.setRejected(false);
        profileRepo.save(profile);
        return true;
    }

    public boolean rejectProfile(Long id) {
        Optional<ProfileModel> optional = profileRepo.findById(id);
        if (optional.isEmpty()) return false;

        ProfileModel profile = optional.get();
        profile.setApproved(false);
        profile.setRejected(true);
        profileRepo.save(profile);
        return true;
    }

    public long getTotalEventos() {
        return eventRepo.count();
    }

    public long getTotalPerfis() {
        return profileRepo.count();
    }
}
