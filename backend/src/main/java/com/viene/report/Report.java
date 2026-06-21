package com.viene.report;

import com.viene.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
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
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private Long targetId;

    // Snapshot do nome no momento da denúncia — não depende do ator/evento
    // continuar existindo (ou com esse nome) pra exibir o histórico.
    private String name;

    @Lob
    private String reason;

    @ManyToOne
    @JoinColumn(name = "reported_by")
    private User reportedBy;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
