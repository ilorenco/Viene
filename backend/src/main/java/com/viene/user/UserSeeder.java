package com.viene.user;

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

    @Value("${viene.seed.admin.name}")
    private String adminName;

    @Value("${viene.seed.admin.email}")
    private String adminEmail;

    @Value("${viene.seed.admin.password}")
    private String adminPassword;

    @Override
    public void run(ApplicationArguments args) {
        boolean hasAdmin = userRepository.findByEmail(adminEmail).isPresent();
        if (hasAdmin) {
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
}
