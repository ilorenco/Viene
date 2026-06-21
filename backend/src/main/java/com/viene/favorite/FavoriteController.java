package com.viene.favorite;

import com.viene.actor.dto.ActorResponse;
import com.viene.event.dto.EventResponse;
import com.viene.favorite.dto.CreateFavoriteRequest;
import com.viene.favorite.dto.FavoriteResponse;
import com.viene.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/favoritos")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;

    @GetMapping
    public List<FavoriteResponse> findAll(@AuthenticationPrincipal User user) {
        return favoriteService.listAll(user).stream().map(FavoriteResponse::from).toList();
    }

    @GetMapping("/atores")
    public List<ActorResponse> findFavoriteActors(@AuthenticationPrincipal User user) {
        return favoriteService.listFavoriteActors(user).stream().map(ActorResponse::from).toList();
    }

    @GetMapping("/eventos")
    public List<EventResponse> findFavoriteEvents(@AuthenticationPrincipal User user) {
        return favoriteService.listFavoriteEvents(user).stream().map(EventResponse::from).toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FavoriteResponse create(@Valid @RequestBody CreateFavoriteRequest request, @AuthenticationPrincipal User user) {
        return FavoriteResponse.from(favoriteService.add(user, request));
    }

    @DeleteMapping("/{type}/{targetId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String type, @PathVariable Long targetId, @AuthenticationPrincipal User user) {
        favoriteService.remove(user, type, targetId);
    }
}
