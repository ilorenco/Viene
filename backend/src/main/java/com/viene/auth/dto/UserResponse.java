package com.viene.auth.dto;

import com.viene.user.Role;
import com.viene.user.User;

public record UserResponse(String name, String email, Role role) {

    public static UserResponse from(User user) {
        return new UserResponse(user.getName(), user.getEmail(), user.getRole());
    }
}
  