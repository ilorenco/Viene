package com.viene.event;

import com.viene.common.ModerationStatus;
import com.viene.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private LocalDate date;

    @Column(name = "start_time")
    private LocalTime start;

    @Column(name = "end_time")
    private LocalTime end;

    @Enumerated(EnumType.STRING)
    private EventCategory category;

    private String address;

    @Lob
    private String description;

    @Lob
    private String policies;

    private String ticketUrl;

    private String image;

    private Double latitude;

    private Double longitude;

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
