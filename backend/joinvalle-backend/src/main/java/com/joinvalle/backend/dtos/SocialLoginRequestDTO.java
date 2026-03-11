package com.joinvalle.backend.dtos;

import lombok.Data;

@Data
public class SocialLoginRequestDTO {
    private String email;
    private String name;
}