package com.joinvalle.backend.controllers;

import com.joinvalle.backend.models.ActorModel;
import com.joinvalle.backend.models.EventModel;
import com.joinvalle.backend.services.ActorService;
import com.joinvalle.backend.services.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/atores")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ActorController {

    private final ActorService actorService;
    private final EventService eventService; // Adicione esta linha

    @GetMapping
    public List<ActorModel> getAll() {
        return actorService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActorModel> getById(@PathVariable Long id) {
        return actorService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ActorModel> create(@RequestBody ActorModel actor) {
        return ResponseEntity.ok(actorService.create(actor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ActorModel> update(@PathVariable Long id, @RequestBody ActorModel actor) {
        return actorService.update(id, actor)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return actorService.delete(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/eventos")
    public ResponseEntity<EventModel> createEventForActor(@PathVariable Long id, @RequestBody EventModel event) {
        Optional<ActorModel> actorOpt = actorService.getById(id);
        if (actorOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        event.setActor(actorOpt.get());
        EventModel saved = eventService.create(event);
        return ResponseEntity.ok(saved);
    }
}
