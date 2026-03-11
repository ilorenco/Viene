package com.joinvalle.backend.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class NotificationModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Relacionamento com AppUserModel
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private AppUserModel user;

    private String title;
    private String message;

    @Column(nullable = false)
    private Boolean read = false; // Padrão: não lida

    private LocalDateTime sentDate = LocalDateTime.now(); // Definida ao criar
}
