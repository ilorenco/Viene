package com.viene.actor.dto;

import com.viene.actor.Actor;
import com.viene.actor.ActorCategory;
import com.viene.actor.ActorType;

public record ActorResponse(
        Long id,
        String name,
        String description,
        ActorCategory category,
        ActorType type,
        String city,
        String neighborhood,
        double[] position,
        String address,
        String cep,
        String founded,
        String tags,
        String website,
        String phone,
        String email,
        String linkedin,
        String instagram,
        String youtube,
        String image) {

    public static ActorResponse from(Actor actor) {
        return new ActorResponse(
                actor.getId(),
                actor.getName(),
                actor.getDescription(),
                actor.getCategory(),
                actor.getType(),
                actor.getCity(),
                actor.getNeighborhood(),
                new double[] { actor.getLatitude(), actor.getLongitude() },
                actor.getAddress(),
                actor.getCep(),
                actor.getFounded(),
                actor.getTags(),
                actor.getWebsite(),
                actor.getPhone(),
                actor.getEmail(),
                actor.getLinkedin(),
                actor.getInstagram(),
                actor.getYoutube(),
                actor.getImage());
    }
}
