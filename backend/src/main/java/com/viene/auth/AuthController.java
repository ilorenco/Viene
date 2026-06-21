package com.viene.auth;

import com.viene.auth.dto.AuthResponse;
import com.viene.auth.dto.LoginRequest;
import com.viene.auth.dto.MessageResponse;
import com.viene.auth.dto.RecoverPasswordRequest;
import com.viene.auth.dto.RegisterRequest;
import com.viene.auth.dto.RegisterResponse;
import com.viene.auth.dto.UserResponse;
import com.viene.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public RegisterResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/recuperar-senha")
    public MessageResponse recoverPassword(@Valid @RequestBody RecoverPasswordRequest request) {
        return authService.recoverPassword(request);
    }

    @GetMapping("/me")
    public UserResponse me(@AuthenticationPrincipal User user) {
        return authService.me(user);
    }
}
