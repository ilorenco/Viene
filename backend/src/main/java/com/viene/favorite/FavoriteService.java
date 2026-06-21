package com.viene.favorite;

import com.viene.actor.Actor;
import com.viene.actor.ActorRepository;
import com.viene.actor.ActorService;
import com.viene.common.exception.ApiException;
import com.viene.common.exception.ResourceNotFoundException;
import com.viene.event.Event;
import com.viene.event.EventRepository;
import com.viene.event.EventService;
import com.viene.favorite.dto.CreateFavoriteRequest;
import com.viene.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private static final String ATOR = "ator";
    private static final String EVENTO = "evento";

    private final FavoriteRepository favoriteRepository;
    private final ActorRepository actorRepository;
    private final EventRepository eventRepository;
    private final ActorService actorService;
    private final EventService eventService;

    public List<Favorite> listAll(User user) {
        return favoriteRepository.findByUser(user);
    }

    public List<Actor> listFavoriteActors(User user) {
        List<Long> ids = favoriteRepository.findByUserAndType(user, ATOR).stream()
                .map(Favorite::getTargetId)
                .toList();
        return actorRepository.findAllById(ids);
    }

    public List<Event> listFavoriteEvents(User user) {
        List<Long> ids = favoriteRepository.findByUserAndType(user, EVENTO).stream()
                .map(Favorite::getTargetId)
                .toList();
        return eventRepository.findAllById(ids);
    }

    public Favorite add(User user, CreateFavoriteRequest request) {
        String type = validateType(request.type());

        if (type.equals(ATOR)) {
            actorService.findApprovedById(request.targetId());
        } else {
            eventService.findApprovedById(request.targetId());
        }

        if (favoriteRepository.existsByUserAndTypeAndTargetId(user, type, request.targetId())) {
            throw new ApiException("Esse item já está nos favoritos.", HttpStatus.CONFLICT);
        }

        Favorite favorite = Favorite.builder()
                .user(user)
                .type(type)
                .targetId(request.targetId())
                .build();

        return favoriteRepository.save(favorite);
    }

    public void remove(User user, String type, Long targetId) {
        Favorite favorite = favoriteRepository.findByUserAndTypeAndTargetId(user, validateType(type), targetId)
                .orElseThrow(() -> new ResourceNotFoundException("Favorito não encontrado."));
        favoriteRepository.delete(favorite);
    }

    private String validateType(String type) {
        String normalized = type == null ? "" : type.toLowerCase();
        if (!normalized.equals(ATOR) && !normalized.equals(EVENTO)) {
            throw new ApiException("Tipo inválido: deve ser \"ator\" ou \"evento\".", HttpStatus.BAD_REQUEST);
        }
        return normalized;
    }
}
