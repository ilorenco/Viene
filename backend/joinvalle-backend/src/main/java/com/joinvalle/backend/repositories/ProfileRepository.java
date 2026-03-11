package com.joinvalle.backend.repositories;

import com.joinvalle.backend.models.EventModel;
import com.joinvalle.backend.models.ProfileModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProfileRepository extends JpaRepository<ProfileModel, Long> {

    List<ProfileModel> findByDescriptionContainingIgnoreCase(String keyword);
    List<ProfileModel> findByApprovedFalseAndRejectedFalse();

}
