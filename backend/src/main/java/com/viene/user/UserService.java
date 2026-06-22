package com.viene.user;

import com.viene.actor.Actor;
import com.viene.actor.ActorRepository;
import com.viene.common.exception.ApiException;
import com.viene.common.exception.ResourceNotFoundException;
import com.viene.event.Event;
import com.viene.event.EventRepository;
import com.viene.favorite.FavoriteRepository;
import com.viene.question.Question;
import com.viene.question.QuestionRepository;
import com.viene.report.Report;
import com.viene.report.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ActorRepository actorRepository;
    private final EventRepository eventRepository;
    private final ReportRepository reportRepository;
    private final FavoriteRepository favoriteRepository;
    private final QuestionRepository questionRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public void delete(Long id, User requester) {
        if (id.equals(requester.getId())) {
            throw new ApiException("Você não pode excluir a própria conta.", HttpStatus.BAD_REQUEST);
        }

        User user = findById(id);

        List<Actor> actors = actorRepository.findBySubmittedBy(user);
        actors.forEach(actor -> actor.setSubmittedBy(null));
        actorRepository.saveAll(actors);

        List<Event> events = eventRepository.findBySubmittedBy(user);
        events.forEach(event -> event.setSubmittedBy(null));
        eventRepository.saveAll(events);

        List<Report> reports = reportRepository.findByReportedBy(user);
        reports.forEach(report -> report.setReportedBy(null));
        reportRepository.saveAll(reports);

        favoriteRepository.deleteAll(favoriteRepository.findByUser(user));

        List<Question> questions = questionRepository.findByAskedBy(user);
        questions.forEach(question -> question.setAskedBy(null));
        questionRepository.saveAll(questions);

        userRepository.delete(user);
    }

    public User toggleStatus(Long id, User requester) {
        if (id.equals(requester.getId())) {
            throw new ApiException("Você não pode bloquear a própria conta.", HttpStatus.BAD_REQUEST);
        }

        User user = findById(id);
        user.setStatus(user.getStatus() == UserStatus.ATIVO ? UserStatus.BLOQUEADO : UserStatus.ATIVO);
        return userRepository.save(user);
    }

    private User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado: " + id));
    }
}
