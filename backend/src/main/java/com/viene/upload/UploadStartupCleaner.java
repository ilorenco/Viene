package com.viene.upload;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;

// Limpa a pasta de uploads no boot, na mesma hora em que o H2 (em memória) zera
// o banco — sem isso, um arquivo continuaria em disco depois que o Ator/Evento
// que o referenciava deixasse de existir num restart, virando lixo órfão.
@Component
@Slf4j
public class UploadStartupCleaner implements ApplicationRunner {

    private final Path uploadDir;

    public UploadStartupCleaner(@Value("${viene.upload.dir:uploads}") String uploadDir) {
        this.uploadDir = Path.of(uploadDir);
    }

    @Override
    public void run(ApplicationArguments args) {
        if (Files.exists(uploadDir)) {
            try (var paths = Files.walk(uploadDir)) {
                paths.sorted(Comparator.reverseOrder()).forEach(this::delete);
            } catch (IOException ex) {
                throw new UncheckedIOException(ex);
            }
        }

        try {
            Files.createDirectories(uploadDir);
        } catch (IOException ex) {
            throw new UncheckedIOException(ex);
        }

        log.info("Pasta de uploads limpa: {}", uploadDir.toAbsolutePath());
    }

    private void delete(Path path) {
        try {
            Files.delete(path);
        } catch (IOException ex) {
            throw new UncheckedIOException(ex);
        }
    }
}
