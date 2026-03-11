package com.joinvalle.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.JoinColumn;
import lombok.Data;

@Data
@Entity
public class ProfileModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private AppUserModel user;
    
    private String description;
    private String phone;
    
    private Boolean approved = false;
    private Boolean rejected = false;
    
    // métodos
    // getEventos
    // getContatos
}