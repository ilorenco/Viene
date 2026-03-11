package com.joinvalle.backend.models;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class AppUserModel implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private String cpf;
    private LocalDate birthDate;
    private String local; //todo: confirmar tipo depois

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private ProfileModel profile;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<NotificationModel> notifications;

    // Métodos auxiliares (mesmo com Lombok, você pode querer deixá-los explícitos):

    public ProfileModel getPerfil() {
        return this.profile;
    }

    public List<NotificationModel> getNotificacoes() {
        return this.notifications;
    }

    // Implementação dos métodos do UserDetails
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("USER"));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
