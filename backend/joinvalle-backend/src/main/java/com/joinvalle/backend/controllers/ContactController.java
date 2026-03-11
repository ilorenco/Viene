package com.joinvalle.backend.controllers;

import com.joinvalle.backend.models.ContactModel;
import com.joinvalle.backend.services.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contatos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ContactController {

    private final ContactService contactService;

    @PostMapping("/perfil/{profileId}")
    public ResponseEntity<ContactModel> addContact(@PathVariable Long profileId, @RequestBody ContactModel contact) {
        return ResponseEntity.ok(contactService.addContactToProfile(profileId, contact));
    }

    @DeleteMapping("/{contactId}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long contactId) {
        return contactService.deleteContact(contactId)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
