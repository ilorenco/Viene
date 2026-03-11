package com.joinvalle.backend.controllers;

import com.joinvalle.backend.dtos.ChangePasswordRequestDTO;
import com.joinvalle.backend.dtos.NotificationResponseDTO;
import com.joinvalle.backend.dtos.UpdateUserRequestDTO;
import com.joinvalle.backend.dtos.UserResponseDTO;
import com.joinvalle.backend.services.UserService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserResponseDTO> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

    @PutMapping("/profile")
    public ResponseEntity<UserResponseDTO> updateUser(@RequestBody UpdateUserRequestDTO request) {
        return ResponseEntity.ok(userService.updateUser(request));
    }

    @PutMapping("/password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequestDTO request) {
        userService.changePassword(request);
        return ResponseEntity.ok("Senha alterada com sucesso");
    }

    @GetMapping("/dashboard")
    public ResponseEntity<UserResponseDTO> getDashboard() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/notificacoes")
    public ResponseEntity<List<NotificationResponseDTO>> getNotifications() {
        return ResponseEntity.ok(userService.getUserNotifications());
    }

    @PutMapping("/notificacoes/{id}/ler")
    public ResponseEntity<String> markNotificationAsRead(@PathVariable Long id) {
        userService.markNotificationAsRead(id);
        return ResponseEntity.ok("Notificação marcada como lida");
    }
} 