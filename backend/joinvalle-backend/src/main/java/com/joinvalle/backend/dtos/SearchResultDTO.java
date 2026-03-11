package com.joinvalle.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SearchResultDTO {
    private String type;   // "event", "profile", etc.
    private Long id;
    private String title;  // or name
    private String description;
}
