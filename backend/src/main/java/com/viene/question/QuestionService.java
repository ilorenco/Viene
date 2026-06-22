package com.viene.question;

import com.viene.common.exception.ResourceNotFoundException;
import com.viene.question.dto.CreateQuestionRequest;
import com.viene.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    public List<Question> findAll() {
        return questionRepository.findAll();
    }

    public List<Question> findMine(User user) {
        return questionRepository.findByAskedBy(user);
    }

    public Question create(CreateQuestionRequest request, User user) {
        Question question = Question.builder()
                .question(request.question())
                .askedBy(user)
                .build();
        return questionRepository.save(question);
    }

    public Question answer(Long id, String answer) {
        Question question = findById(id);
        question.setAnswer(answer);
        question.setAnsweredAt(LocalDateTime.now());
        return questionRepository.save(question);
    }

    public void delete(Long id) {
        questionRepository.delete(findById(id));
    }

    private Question findById(Long id) {
        return questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pergunta não encontrada: " + id));
    }
}
