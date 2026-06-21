package com.viene.favorite.dto;

import com.viene.favorite.Favorite;

public record FavoriteResponse(Long id, String type, Long targetId) {

    public static FavoriteResponse from(Favorite favorite) {
        return new FavoriteResponse(favorite.getId(), favorite.getType(), favorite.getTargetId());
    }
}
