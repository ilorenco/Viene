package com.viene.auth.dto;

import com.viene.user.User;

public record RegisterResponse(Long id, String name, String email) {

    public static RegisterResponse from(User user) {
        return new RegisterResponse(user.getId(), user.getName(), user.getEmail());
    }
}
