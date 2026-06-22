package com.viene.faq;

import com.viene.common.exception.ResourceNotFoundException;
import com.viene.faq.dto.FaqRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FaqService {

    private final FaqRepository faqRepository;

    public List<Faq> findAll() {
        return faqRepository.findAll();
    }

    public Faq create(FaqRequest request) {
        Faq faq = Faq.builder()
                .category(request.category())
                .question(request.question())
                .answer(request.answer())
                .build();
        return faqRepository.save(faq);
    }

    public Faq update(Long id, FaqRequest request) {
        Faq faq = findById(id);
        faq.setCategory(request.category());
        faq.setQuestion(request.question());
        faq.setAnswer(request.answer());
        return faqRepository.save(faq);
    }

    public void delete(Long id) {
        faqRepository.delete(findById(id));
    }

    private Faq findById(Long id) {
        return faqRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pergunta frequente não encontrada: " + id));
    }
}
