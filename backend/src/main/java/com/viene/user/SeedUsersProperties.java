package com.viene.user;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

// Lista de usuarios "semente" lida de viene.seed.users[N] no application.properties.
// As senhas chegam por variavel de ambiente (nunca versionadas); ver UserSeeder.
@Component
@ConfigurationProperties(prefix = "viene.seed")
@Getter
@Setter
public class SeedUsersProperties {

    private List<SeedUser> users = new ArrayList<>();

    @Getter
    @Setter
    public static class SeedUser {
        private String name;
        private String email;
        private String role; // ADMIN, USUARIO ou ATOR (default USUARIO se invalido)
        private String password; // vem de env var; em branco = nao semeia este usuario
    }
}
