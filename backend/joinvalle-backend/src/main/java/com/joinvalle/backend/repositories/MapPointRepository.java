package com.joinvalle.backend.repositories;

import com.joinvalle.backend.models.MapPointModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MapPointRepository extends JpaRepository<MapPointModel, Long> {
    List<MapPointModel> findByApprovedTrue();
    List<MapPointModel> findByType(String type);
}
