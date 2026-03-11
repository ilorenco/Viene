package com.joinvalle.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class InstitucionalController {

    @GetMapping("/ajuda")
    public ResponseEntity<String> getAjuda() {
        return ResponseEntity.ok("Aqui você encontra informações de ajuda sobre o sistema Joinvalle.");
    }

    @GetMapping("/contato")
    public ResponseEntity<String> getContato() {
        return ResponseEntity.ok("Entre em contato pelo e-mail: contato@joinvalle.com.br");
    }

    @GetMapping("/termos")
    public ResponseEntity<String> getTermos() {
        return ResponseEntity.ok("Termos de uso: Ao utilizar este sistema, você concorda com os termos e condições...");
    }
}
