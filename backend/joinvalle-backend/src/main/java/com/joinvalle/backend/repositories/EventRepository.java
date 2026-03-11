package com.joinvalle.backend.repositories;

import com.joinvalle.backend.models.EventModel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EventRepository extends JpaRepository<EventModel, Long> {

    // Search events by category name (case-insensitive)
    List<EventModel> findByCategoryNameContainingIgnoreCase(String categoryName);

    // Search events by title keyword (case-insensitive)
    List<EventModel> findByTitleContainingIgnoreCase(String keyword);

    // Get all draft events from a specific user
    List<EventModel> findByDraftTrueAndCreatorUserId(Long userId);

    // Get all events from a specific user, sorted by start date
    List<EventModel> findByCreatorUserIdOrderByInicialDateDesc(Long userId);

    // For admin: list events that are pending approval
    List<EventModel> findByApprovedFalseAndRejectedFalse();

    // For public display: only approved events
    List<EventModel> findByApprovedTrue();

    // For search: approved events by title keyword
    List<EventModel> findByTitleContainingIgnoreCaseAndApprovedTrue(String keyword);

    // (Optional) For statistics: count how many events are approved
    Long countByApprovedTrue();

}
