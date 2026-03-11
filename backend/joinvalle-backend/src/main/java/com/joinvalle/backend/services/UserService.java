package com.joinvalle.backend.services;

import com.joinvalle.backend.dtos.ChangePasswordRequestDTO;
import com.joinvalle.backend.dtos.NotificationResponseDTO;
import com.joinvalle.backend.dtos.UpdateUserRequestDTO;
import com.joinvalle.backend.dtos.UserResponseDTO;
import com.joinvalle.backend.models.AppUserModel;
import com.joinvalle.backend.models.NotificationModel;
import com.joinvalle.backend.repositories.AppUserRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public UserResponseDTO getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        AppUserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        return new UserResponseDTO(user.getId(), user.getName(), user.getEmail());
    }
    
    public UserResponseDTO updateUser(UpdateUserRequestDTO request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        AppUserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        // Verificar se o novo email já existe (se foi alterado)
        if (request.getEmail() != null && !request.getEmail().equals(user.getEmail())) {
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new RuntimeException("Email já está em uso");
            }
        }
        
        // Atualizar dados
        if (request.getName() != null) {
            user.setName(request.getName());
        }
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        
        AppUserModel updatedUser = userRepository.save(user);
        return new UserResponseDTO(updatedUser.getId(), updatedUser.getName(), updatedUser.getEmail());
    }
    
    public void changePassword(ChangePasswordRequestDTO request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        AppUserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        // Verificar se a senha atual está correta
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Senha atual incorreta");
        }
        
        // Atualizar senha
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public List<NotificationResponseDTO> getUserNotifications() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        AppUserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        if (user.getNotifications() == null) return List.of();
        return user.getNotifications().stream()
                .map(n -> new NotificationResponseDTO(
                        n.getId(),
                        n.getTitle(),
                        n.getMessage(),
                        n.getRead(),
                        n.getSentDate()
                ))
                .collect(Collectors.toList());
    }

    public void markNotificationAsRead(Long notificationId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        AppUserModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        NotificationModel notification = user.getNotifications().stream()
                .filter(n -> n.getId().equals(notificationId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Notificação não encontrada"));
        notification.setRead(true);
        // Salva a notificação atualizada
        userRepository.save(user);
    }
} 