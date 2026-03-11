package com.joinvalle.backend.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

@RestController
@RequestMapping("/map/geocode")
public class GeocodingController {

    private final RestClient restClient;

    public GeocodingController(RestClient.Builder restClientBuilder) {
        this.restClient = restClientBuilder.build();
    }

    @GetMapping
    public ResponseEntity<String> geocode(@RequestParam("q") String q) {
        String body = restClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("nominatim.openstreetmap.org")
                        .path("/search")
                        .queryParam("q", q)
                        .queryParam("format", "json")
                        .queryParam("limit", "1")
                        .build())
                .header(HttpHeaders.USER_AGENT, "JoinValle/1.0 (local-dev)")
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .body(String.class);

        return ResponseEntity.ok()
                .body(body == null ? "[]" : body);
    }
}

