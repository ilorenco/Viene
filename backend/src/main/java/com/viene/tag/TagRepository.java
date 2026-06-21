package com.viene.tag;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {

    boolean existsByLabelAndKind(String label, TagKind kind);
}
