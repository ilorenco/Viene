package com.viene.actor;

import com.viene.actor.dto.CreateActorRequest;
import com.viene.common.ModerationStatus;
import com.viene.common.exception.ResourceNotFoundException;
import com.viene.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActorService {

    private final ActorRepository actorRepository;

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

        Actor actor = Actor.builder()
                .name(request.name())
                .address(request.address())
                .type(request.type())
                .category(request.type().category())
                .description(request.description())
                .tags(request.tags())
                .website(request.website())
                .email(request.email())
                .phone(request.phone())
                .latitude(position != null ? position[0] : null)
                .longitude(position != null ? position[1] : null)
                .status(ModerationStatus.PENDENTE)
                .submittedBy(submitter)
                .build();

        return actorRepository.save(actor);
    }

    public void delete(Long id) {
        Actor actor = findById(id);
        actorRepository.delete(actor);
    }

    public List<Actor> findSubmissions() {
        return actorRepository.findBySubmittedByIsNotNull();
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
