package com.viene.user.dto;

import com.viene.common.PortugueseDates;
import com.viene.user.Role;
import com.viene.user.User;
import com.viene.user.UserStatus;

public record UserAdminResponse(Long id, String name, String email, Role role, UserStatus status, String createdAt) {

    public static UserAdminResponse from(User user) {
        return new UserAdminResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getStatus(),
                PortugueseDates.displayDate(user.getCreatedAt().toLocalDate()));
    }
}
