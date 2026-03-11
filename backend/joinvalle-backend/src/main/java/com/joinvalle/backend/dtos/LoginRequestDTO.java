package com.joinvalle.backend.dtos;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String email;
    private String password;
} 