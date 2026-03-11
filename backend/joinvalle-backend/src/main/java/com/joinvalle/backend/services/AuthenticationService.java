package com.joinvalle.backend.services;

import com.joinvalle.backend.dtos.LoginRequestDTO;
import com.joinvalle.backend.dtos.LoginResponseDTO;
import com.joinvalle.backend.dtos.RegisterRequestDTO;
import com.joinvalle.backend.dtos.UserResponseDTO;
import com.joinvalle.backend.models.AppUserModel;
import com.joinvalle.backend.repositories.AppUserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AppUserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public LoginResponseDTO register(RegisterRequestDTO request) {
        var user = new AppUserModel();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        AppUserModel savedUser = repository.save(user);
        var jwtToken = jwtService.generateToken(savedUser);
        return new LoginResponseDTO(jwtToken, savedUser.getEmail(), savedUser.getName(), savedUser.getId());
    }

    public LoginResponseDTO authenticate(LoginRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return new LoginResponseDTO(jwtToken, user.getEmail(), user.getName(), user.getId());
    }

    public void recoverPassword(String email) {
        var userOpt = repository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }
    }

    public LoginResponseDTO socialLogin(String email, String name) {
        var userOpt = repository.findByEmail(email);
        AppUserModel user;
        if (userOpt.isPresent()) {
            user = userOpt.get();
        } else {
            user = new AppUserModel();
            user.setEmail(email);
            user.setName(name != null ? name : email);
            user.setPassword(""); // Não define senha para login social
            user = repository.save(user);
        }
        var jwtToken = jwtService.generateToken(user);
        return new LoginResponseDTO(jwtToken, user.getEmail(), user.getName(), user.getId());
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }
} 