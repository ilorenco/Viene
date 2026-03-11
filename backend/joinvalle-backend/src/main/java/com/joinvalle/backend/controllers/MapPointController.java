package com.joinvalle.backend.controllers;

import com.joinvalle.backend.models.MapPointModel;
import com.joinvalle.backend.services.MapPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/map")
public class MapPointController {

    @Autowired
    private MapPointService mapPointService;

    @GetMapping
    public List<MapPointModel> getAllApprovedPoints() {
        return mapPointService.getApprovedPoints();
    }

    @PostMapping
    public ResponseEntity<MapPointModel> createPoint(@RequestBody MapPointModel point) {
        return ResponseEntity.ok(mapPointService.create(point));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePoint(@PathVariable Long id, @RequestBody MapPointModel point) {
        return mapPointService.update(id, point)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePoint(@PathVariable Long id) {
        return mapPointService.delete(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
