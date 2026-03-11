package com.joinvalle.backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class MapPointModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private Double latitude;

    private Double longitude;

    private String type; // e.g. "event", "actor", "organization"

    private Boolean approved = false;

    @ManyToOne
    @JoinColumn(name = "created_by_id")
    private AppUserModel createdBy;
}
