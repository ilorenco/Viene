package com.viene.publication;

import com.viene.publication.dto.MyPublicationsResponse;
import com.viene.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PublicationController {

    private final PublicationService publicationService;

    @GetMapping("/usuarios/me/publicacoes")
    public MyPublicationsResponse findMine(@AuthenticationPrincipal User user) {
        return publicationService.findMine(user);
    }
}
