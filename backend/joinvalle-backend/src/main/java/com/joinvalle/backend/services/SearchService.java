package com.joinvalle.backend.services;

import com.joinvalle.backend.dtos.SearchResultDTO;
import com.joinvalle.backend.models.EventModel;
import com.joinvalle.backend.models.ProfileModel;
import com.joinvalle.backend.repositories.EventRepository;
import com.joinvalle.backend.repositories.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchService {

    @Autowired
    private EventRepository eventRepo;

    @Autowired
    private ProfileRepository profileRepo;

    public List<SearchResultDTO> search(String keyword) {
        List<SearchResultDTO> results = new ArrayList<>();

        List<EventModel> events = eventRepo.findByTitleContainingIgnoreCase(keyword);
        for (EventModel event : events) {
            results.add(new SearchResultDTO("event", event.getId(), event.getTitle(), event.getDescription()));
        }

        List<ProfileModel> profiles = profileRepo.findByDescriptionContainingIgnoreCase(keyword);
        for (ProfileModel profile : profiles) {
            results.add(new SearchResultDTO("profile", profile.getId(), profile.getUser().getName(), profile.getDescription()));
        }

        return results;
    }
}
