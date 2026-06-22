package com.viene.auth.dto;

import com.viene.user.Role;
import com.viene.user.User;

import java.time.LocalDate;

public record UserResponse(
        String name, String email, Role role, String phone, LocalDate birthdate, String avatar) {

    public static UserResponse from(User user) {
        return new UserResponse(
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getPhone(),
                user.getBirthdate(),
                user.getAvatar());
    }
}
