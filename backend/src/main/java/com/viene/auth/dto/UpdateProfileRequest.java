package com.viene.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record UpdateProfileRequest(
        @NotBlank(message = "O nome é obrigatório.") String name,
        @NotBlank(message = "O e-mail é obrigatório.") @Email(message = "E-mail inválido.") String email,
        String phone,
        LocalDate birthdate) {
}
