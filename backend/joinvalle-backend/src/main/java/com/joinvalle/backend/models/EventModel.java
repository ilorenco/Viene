package com.joinvalle.backend.models;

import com.joinvalle.backend.models.ActorModel;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
public class EventModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    private LocalDateTime inicialDate;
    private LocalDateTime finalDate;

    private Boolean draft = false;
    private Boolean canceled = false;

    private Boolean approved = false;
    private Boolean rejected = false;


    // Criador do evento
    @ManyToOne
    @JoinColumn(name = "profile_id")
    private ProfileModel creator;

    // Categoria do evento
    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEventModel category;

    // Usuários inscritos no evento
    @ManyToMany
    @JoinTable(
            name = "event_subscriptions",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<AppUserModel> registered;

    @ManyToOne
    @JoinColumn(name = "actor_id")
    private ActorModel actor;
}
