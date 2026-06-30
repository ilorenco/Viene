package com.viene.user;

import com.viene.user.SeedUsersProperties.SeedUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class UserSeeder implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SeedUsersProperties seedUsersProperties;

    @Value("${viene.seed.admin.name}")
    private String adminName;

    @Value("${viene.seed.admin.email}")
    private String adminEmail;

    @Value("${viene.seed.admin.password}")
    private String adminPassword;

    @Override
    public void run(ApplicationArguments args) {
        seedDefaultAdmin();
        seedUsersProperties.getUsers().forEach(this::seedUser);
    }

    // Admin "semente" padrao (admin@viene.com), criado so se ainda nao existir.
    private void seedDefaultAdmin() {
        if (userRepository.existsByEmail(adminEmail)) {
            return;
        }

        User admin = User.builder()
                .name(adminName)
                .email(adminEmail)
                .password(passwordEncoder.encode(adminPassword))
                .role(Role.ADMIN)
                .build();
        userRepository.save(admin);
        log.info("Conta admin semente criada: {}", adminEmail);
    }

    // Usuario da lista viene.seed.users[N]. Pula com seguranca quando: falta e-mail,
    // falta senha (variavel de ambiente ausente) ou o usuario ja existe. Assim nunca
    // se cria uma conta com senha em branco nem se sobrescreve uma existente.
    private void seedUser(SeedUser seed) {
        if (seed.getEmail() == null || seed.getEmail().isBlank()) {
            return;
        }
        if (seed.getPassword() == null || seed.getPassword().isBlank()) {
            log.warn("Usuario semente '{}' ignorado: senha nao definida (variavel de ambiente ausente).",
                    seed.getEmail());
            return;
        }
        if (userRepository.existsByEmail(seed.getEmail())) {
            return;
        }

        Role role = parseRole(seed.getRole());
        User user = User.builder()
                .name(seed.getName())
                .email(seed.getEmail())
                .password(passwordEncoder.encode(seed.getPassword()))
                .role(role)
                .build();
        userRepository.save(user);
        log.info("Usuario semente criado: {} ({})", seed.getEmail(), role);
    }

    private Role parseRole(String raw) {
        if (raw == null || raw.isBlank()) {
            return Role.USUARIO;
        }
        try {
            return Role.valueOf(raw.trim().toUpperCase());
        } catch (IllegalArgumentException ex) {
            log.warn("Papel '{}' invalido no seed; usando USUARIO.", raw);
            return Role.USUARIO;
        }
    }
}
