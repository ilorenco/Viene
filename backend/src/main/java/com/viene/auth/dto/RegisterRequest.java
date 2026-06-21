package com.viene.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record RegisterRequest(
        @NotBlank(message = "O nome é obrigatório.") String name,

        @NotBlank(message = "O e-mail é obrigatório.") @Email(message = "E-mail inválido.") String email,

        // RN_002: senha com pelo menos 8 caracteres, contendo letras e números.
        @NotBlank(message = "A senha é obrigatória.")
        @Pattern(
                regexp = "^(?=.*[A-Za-z])(?=.*\\d).{8,}$",
                message = "A senha deve ter ao menos 8 caracteres, com letras e números.")
        String password) {
}
