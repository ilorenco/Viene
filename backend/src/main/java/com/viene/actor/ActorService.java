package com.viene.actor;

import com.viene.actor.dto.CreateActorRequest;
import com.viene.common.ModerationStatus;
import com.viene.common.exception.ResourceNotFoundException;
import com.viene.publication.ActorEventLinkRepository;
import com.viene.publication.dto.UpdateActorRequest;
import com.viene.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActorService {

    private final ActorRepository actorRepository;
    private final ActorEventLinkRepository actorEventLinkRepository;

    public List<Actor> findAllApproved() {
        return actorRepository.findByStatus(ModerationStatus.APROVADO);
    }

    public Actor findApprovedById(Long id) {
        Actor actor = findById(id);
        if (actor.getStatus() != ModerationStatus.APROVADO) {
            throw new ResourceNotFoundException("Ator não encontrado: " + id);
        }
        return actor;
    }

    public Actor findById(Long id) {
        return actorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ator não encontrado: " + id));
    }

    public Actor create(CreateActorRequest request, User submitter) {
        double[] position = request.position();
        String[] location = parseLocation(request.address());

        Actor actor = Actor.builder()
                .name(request.name())
                .address(request.address())
                .neighborhood(location[0])
                .city(location[1])
                .type(request.type())
                .category(request.type().category())
                .description(request.description())
                .tags(request.tags())
                .website(request.website())
                .email(request.email())
                .phone(request.phone())
                .image(request.image())
                .latitude(position != null ? position[0] : null)
                .longitude(position != null ? position[1] : null)
                .status(ModerationStatus.PENDENTE)
                .submittedBy(submitter)
                .build();

        return actorRepository.save(actor);
    }

    // O formulário pede o endereço no formato "rua, número, bairro, cidade"
    // (mesma convenção da planilha original semeada em ActorSeeder) — extrai
    // bairro/cidade dos dois últimos segmentos pra alimentar o card/filtro de
    // cidade sem exigir campos extras no formulário. Sem vírgula suficiente,
    // devolve os dois null (sem adivinhar).
    private static String[] parseLocation(String address) {
        if (address == null) return new String[] { null, null };
        String[] parts = address.split(",");
        if (parts.length < 2) return new String[] { null, null };
        String city = parts[parts.length - 1].trim();
        // Só assume bairro com os 4 segmentos completos (rua, número, bairro,
        // cidade) — com 3 (sem bairro), o penúltimo seria o número da casa.
        String neighborhood = parts.length >= 4 ? parts[parts.length - 2].trim() : "";
        return new String[] { neighborhood.isEmpty() ? null : neighborhood, city.isEmpty() ? null : city };
    }

    @Transactional
    public void delete(Long id) {
        Actor actor = findById(id);
        actorEventLinkRepository.deleteAllByActor(actor);
        actorRepository.delete(actor);
    }

    public List<Actor> findSubmissions() {
        return actorRepository.findBySubmittedByIsNotNull();
    }

    public List<Actor> findMyPublications(User user) {
        return actorRepository.findBySubmittedBy(user).stream()
                .filter(actor -> actor.getStatus() != ModerationStatus.PENDENTE)
                .toList();
    }

    public Actor update(Long id, UpdateActorRequest request) {
        Actor actor = findById(id);
        String[] location = parseLocation(request.address());
        actor.setName(request.name());
        actor.setType(request.type());
        actor.setCategory(request.type().category());
        actor.setAddress(request.address());
        actor.setNeighborhood(location[0]);
        actor.setCity(location[1]);
        actor.setDescription(request.description());
        actor.setWebsite(request.website());
        actor.setEmail(request.email());
        actor.setPhone(request.phone());
        actor.setImage(request.image());
        return actorRepository.save(actor);
    }

    public Actor decide(Long id, boolean approved, String comment) {
        Actor actor = findById(id);
        actor.setStatus(approved ? ModerationStatus.APROVADO : ModerationStatus.REJEITADO);
        if (comment != null && !comment.isBlank()) {
            actor.setModerationComment(comment);
        }
        return actorRepository.save(actor);
    }

    public Actor addModerationComment(Long id, String comment) {
        Actor actor = findById(id);
        actor.setModerationComment(comment);
        return actorRepository.save(actor);
    }
}
