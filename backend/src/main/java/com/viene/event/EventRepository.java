package com.viene.event;

import com.viene.common.ModerationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByStatus(ModerationStatus status);

    List<Event> findBySubmittedByIsNotNull();
}
