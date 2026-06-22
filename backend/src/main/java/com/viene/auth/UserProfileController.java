package com.viene.auth;

import com.viene.auth.dto.AuthResponse;
import com.viene.auth.dto.UpdateProfileRequest;
import com.viene.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserProfileController {

    private final AuthService authService;

    @PutMapping("/profile")
    public AuthResponse updateProfile(@Valid @RequestBody UpdateProfileRequest request, @AuthenticationPrincipal User user) {
        return authService.updateProfile(user, request);
    }
}
