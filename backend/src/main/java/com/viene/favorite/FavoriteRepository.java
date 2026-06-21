package com.viene.favorite;

import com.viene.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    List<Favorite> findByUser(User user);

    List<Favorite> findByUserAndType(User user, String type);

    Optional<Favorite> findByUserAndTypeAndTargetId(User user, String type, Long targetId);

    boolean existsByUserAndTypeAndTargetId(User user, String type, Long targetId);
}
