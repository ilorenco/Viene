package com.joinvalle.backend.controllers;

import com.joinvalle.backend.services.AdminService;
import com.joinvalle.backend.models.ActorModel;
import com.joinvalle.backend.repositories.ActorRepository;
import com.joinvalle.backend.models.AppUserModel;
import com.joinvalle.backend.repositories.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private ActorRepository actorRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    // GET /admin/aprovacoes
    @GetMapping("/aprovações")
    public ResponseEntity<?> getPendingContent() {
        return ResponseEntity.ok(adminService.getPendingContent());
    }

    // PUT /admin/eventos/{id}?status=approve|reject
    @PutMapping("/eventos/{id}")
    public ResponseEntity<?> updateEventStatus(@PathVariable Long id, @RequestParam String status) {
        if (status.equalsIgnoreCase("approve")) {
            return adminService.approveEvent(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
        } else if (status.equalsIgnoreCase("reject")) {
            return adminService.rejectEvent(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().body("Invalid status");
    }

    // PUT /admin/atores/{id}?status=approve|reject
    @PutMapping("/atores/{id}")
    public ResponseEntity<?> updateActorStatus(@PathVariable Long id, @RequestParam String status) {
        // Exemplo: apenas um campo "status" no ActorModel
        return actorRepository.findById(id).map(actor -> {
            actor.setStatus(status);
            actorRepository.save(actor);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

    // GET /admin/estatisticas
    @GetMapping("/estatisticas")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsuarios", appUserRepository.count());
        stats.put("totalAtores", actorRepository.count());
        stats.put("totalEventos", adminService.getTotalEventos());
        stats.put("totalPerfis", adminService.getTotalPerfis());
        // Adicione outras estatísticas conforme necessário
        return ResponseEntity.ok(stats);
    }

    // GET /admin/usuarios
    @GetMapping("/usuarios")
    public ResponseEntity<List<AppUserModel>> getAllUsers() {
        return ResponseEntity.ok(appUserRepository.findAll());
    }

    // POST /admin/comentarios
    @PostMapping("/comentarios")
    public ResponseEntity<String> addComment(@RequestBody Map<String, String> body) {
        // Exemplo simples: apenas retorna o comentário recebido
        String comentario = body.get("comentario");
        // Aqui você pode salvar o comentário em uma tabela específica se desejar
        return ResponseEntity.ok("Comentário recebido: " + comentario);
    }
}
