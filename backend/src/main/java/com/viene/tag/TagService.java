package com.viene.tag;

import com.viene.actor.Actor;
import com.viene.actor.ActorRepository;
import com.viene.common.exception.ApiException;
import com.viene.common.exception.ResourceNotFoundException;
import com.viene.tag.dto.CreateTagRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    private final ActorRepository actorRepository;

    public List<Tag> findAll() {
        return tagRepository.findAll();
    }

    public Tag create(CreateTagRequest request) {
        if (tagRepository.existsByLabelAndKind(request.label(), request.kind())) {
            throw new ApiException("A tag \"" + request.label() + "\" já existe.", HttpStatus.CONFLICT);
        }

        Tag tag = Tag.builder().label(request.label()).kind(request.kind()).build();
        return tagRepository.save(tag);
    }

    public void delete(Long id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tag não encontrada: " + id));

        tagRepository.delete(tag);

        if (tag.getKind() == TagKind.ATOR) {
            removeFromActors(tag.getLabel());
        }
    }

    private void removeFromActors(String label) {
        List<Actor> affected = actorRepository.findByTags(label);
        affected.forEach(actor -> actor.setTags(null));
        actorRepository.saveAll(affected);
    }
}
