package com.viene.tag.dto;

import com.viene.tag.Tag;
import com.viene.tag.TagKind;

public record TagResponse(Long id, String label, TagKind kind) {

    public static TagResponse from(Tag tag) {
        return new TagResponse(tag.getId(), tag.getLabel(), tag.getKind());
    }
}
