package com.viene.upload;

import com.viene.common.exception.ApiException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.UUID;

@Service
@Slf4j
public class FileStorageService {

    private static final Map<String, String> EXTENSIONS_BY_CONTENT_TYPE = Map.of(
            "image/jpeg", ".jpg",
            "image/png", ".png",
            "image/webp", ".webp",
            "image/gif", ".gif");

    private final Path uploadDir;

    public FileStorageService(@Value("${viene.upload.dir:uploads}") String uploadDir) {
        this.uploadDir = Path.of(uploadDir);
    }

    public String store(MultipartFile file) {
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new ApiException("Só é permitido enviar arquivos de imagem.", HttpStatus.BAD_REQUEST);
        }

        // Nome gerado aleatoriamente: nunca usa o nome original do arquivo (evita
        // path traversal e colisão entre uploads de usuários diferentes).
        String extension = EXTENSIONS_BY_CONTENT_TYPE.getOrDefault(contentType, "");
        String filename = UUID.randomUUID() + extension;

        try {
            Files.createDirectories(uploadDir);
            file.transferTo(uploadDir.resolve(filename));
        } catch (IOException ex) {
            log.error("Falha ao salvar arquivo de upload", ex);
            throw new ApiException("Não foi possível salvar o arquivo.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return "/uploads/" + filename;
    }
}
