package com.viene.publication.dto;

import java.util.List;

public record MyPublicationsResponse(
        List<ActorPublicationResponse> actors,
        List<EventPublicationResponse> events) {
}
