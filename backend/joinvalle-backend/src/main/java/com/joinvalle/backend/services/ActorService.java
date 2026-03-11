package com.joinvalle.backend.services;

import com.joinvalle.backend.models.ActorModel;
import com.joinvalle.backend.repositories.ActorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActorService {

    @Autowired
    private ActorRepository actorRepository;

    public List<ActorModel> getAll() {
        return actorRepository.findAll();
    }

    public Optional<ActorModel> getById(Long id) {
        return actorRepository.findById(id);
    }

    public ActorModel create(ActorModel actor) {
        return actorRepository.save(actor);
    }

    public Optional<ActorModel> update(Long id, ActorModel updated) {
        return actorRepository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setDescription(updated.getDescription());
            existing.setLocal(updated.getLocal());
            existing.setDate(updated.getDate());
            existing.setStatus(updated.getStatus());
            existing.setMaxTickets(updated.getMaxTickets());
            existing.setActor(updated.getActor());
            return actorRepository.save(existing);
        });
    }

    public boolean delete(Long id) {
        if (!actorRepository.existsById(id)) return false;
        actorRepository.deleteById(id);
        return true;
    }
}
