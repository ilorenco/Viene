package com.viene.actor;

import com.viene.common.ModerationStatus;
import com.viene.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Actor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    private ActorCategory category;

    @Enumerated(EnumType.STRING)
    private ActorType type;

    private String city;

    private String neighborhood;

    private Double latitude;

    private Double longitude;

    private String address;

    private String cep;

    private String founded;

    private String tags;

    private String website;

    private String phone;

    private String email;

    private String linkedin;

    private String instagram;

    private String youtube;

    private String image;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private ModerationStatus status = ModerationStatus.APROVADO;

    @ManyToOne
    @JoinColumn(name = "submitted_by")
    private User submittedBy;

    private String moderationComment;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
