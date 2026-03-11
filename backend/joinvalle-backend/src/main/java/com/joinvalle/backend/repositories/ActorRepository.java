package com.joinvalle.backend.repositories;

import com.joinvalle.backend.models.ActorModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActorRepository extends JpaRepository<ActorModel, Long> {
}
