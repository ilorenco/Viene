package com.viene.actor;

import com.viene.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActorService {

    private final ActorRepository actorRepository;

    public List<Actor> findAll() {
        return actorRepository.findAll();
    }

    public Actor findById(Long id) {
        return actorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ator não encontrado: " + id));
    }

    public void delete(Long id) {
        Actor actor = findById(id);
        actorRepository.delete(actor);
    }
}
