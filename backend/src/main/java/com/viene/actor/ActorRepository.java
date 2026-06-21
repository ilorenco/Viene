package com.viene.actor;

import com.viene.common.ModerationStatus;
import com.viene.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActorRepository extends JpaRepository<Actor, Long> {

    List<Actor> findByTags(String tags);

    List<Actor> findByStatus(ModerationStatus status);

    List<Actor> findBySubmittedByIsNotNull();

    List<Actor> findBySubmittedBy(User submittedBy);
}
