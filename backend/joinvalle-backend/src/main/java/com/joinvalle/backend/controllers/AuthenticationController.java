package com.joinvalle.backend.controllers;

import com.joinvalle.backend.dtos.LoginRequestDTO;
import com.joinvalle.backend.dtos.LoginResponseDTO;
import com.joinvalle.backend.dtos.PasswordRecoveryRequestDTO;
import com.joinvalle.backend.dtos.RegisterRequestDTO;
import com.joinvalle.backend.dtos.SocialLoginRequestDTO;
import com.joinvalle.backend.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<LoginResponseDTO> register(
            @RequestBody RegisterRequestDTO request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> authenticate(
            @RequestBody LoginRequestDTO request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/recuperar-senha")
    public ResponseEntity<String> recoverPassword(@RequestBody PasswordRecoveryRequestDTO request) {
        service.recoverPassword(request.getEmail());
        return ResponseEntity.ok("Se o e-mail existir, as instruções de recuperação foram enviadas.");
    }

    @PostMapping("/login/social")
    public ResponseEntity<LoginResponseDTO> socialLogin(@RequestBody SocialLoginRequestDTO request) {
        return ResponseEntity.ok(service.socialLogin(request.getEmail(), request.getName()));
    }
} 