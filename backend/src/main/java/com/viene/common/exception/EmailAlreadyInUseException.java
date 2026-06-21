package com.viene.common.exception;

import org.springframework.http.HttpStatus;

public class EmailAlreadyInUseException extends ApiException {

    public EmailAlreadyInUseException(String email) {
        super("O e-mail " + email + " já está em uso.", HttpStatus.CONFLICT);
    }
}
