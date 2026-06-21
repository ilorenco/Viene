package com.viene.common.exception;

import org.springframework.http.HttpStatus;

public class InvalidCredentialsException extends ApiException {

    public InvalidCredentialsException() {
        super("E-mail ou senha inválidos.", HttpStatus.UNAUTHORIZED);
    }
}
