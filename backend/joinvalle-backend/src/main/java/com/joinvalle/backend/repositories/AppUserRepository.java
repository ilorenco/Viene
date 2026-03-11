package com.joinvalle.backend.repositories;

import com.joinvalle.backend.models.AppUserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUserModel, Long> {
    Optional<AppUserModel> findByEmail(String email);
}
