package com.joinvalle.backend.repositories;


import com.joinvalle.backend.models.CategoryEventModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<CategoryEventModel, Long> {
    List<CategoryEventModel> findByName(String name);
}
