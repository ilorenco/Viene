package com.viene.actor;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActorRepository extends JpaRepository<Actor, Long> {

    List<Actor> findByTags(String tags);
}
