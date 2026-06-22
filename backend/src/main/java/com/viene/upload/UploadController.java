package com.viene.upload;

import com.viene.upload.dto.UploadResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/uploads")
@RequiredArgsConstructor
public class UploadController {

    private final FileStorageService fileStorageService;

    @PostMapping
    public UploadResponse upload(@RequestParam MultipartFile file) {
        String relativeUrl = fileStorageService.store(file);
        // URL absoluta: o front roda numa origem diferente do back, então um
        // caminho relativo (ex: "/uploads/x.png") resolveria contra a origem
        // ERRADA (a do próprio front) se devolvido como está.
        String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
        return new UploadResponse(baseUrl + relativeUrl);
    }
}
