package com.joinvalle.backend.repositories;

import com.joinvalle.backend.models.ContactModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<ContactModel, Long> {
}
