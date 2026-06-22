package com.viene.faq.dto;

import com.viene.faq.Faq;
import com.viene.faq.FaqCategory;

public record FaqResponse(Long id, FaqCategory category, String question, String answer) {

    public static FaqResponse from(Faq faq) {
        return new FaqResponse(faq.getId(), faq.getCategory(), faq.getQuestion(), faq.getAnswer());
    }
}
