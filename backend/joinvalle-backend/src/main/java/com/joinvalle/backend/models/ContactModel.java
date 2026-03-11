package com.joinvalle.backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class ContactModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Tipo de contato: EXEMPLO: "instagram", "email", "github"
    private String contactType;

    // Valor do contato: EXEMPLO: "@usuario", "email@dominio.com", "https://github.com/usuario"
    private String valor;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private ProfileModel profile;
}
