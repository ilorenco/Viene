package com.joinvalle.backend.services;

import com.joinvalle.backend.models.ContactModel;
import com.joinvalle.backend.models.ProfileModel;
import com.joinvalle.backend.repositories.ContactRepository;
import com.joinvalle.backend.repositories.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private ProfileRepository profileRepository;

    public ContactModel addContactToProfile(Long profileId, ContactModel contact) {
        ProfileModel profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Perfil não encontrado"));
        contact.setProfile(profile);
        return contactRepository.save(contact);
    }

    public boolean deleteContact(Long contactId) {
        if (!contactRepository.existsById(contactId)) return false;
        contactRepository.deleteById(contactId);
        return true;
    }
}
