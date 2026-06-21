package com.viene.report;

import com.viene.actor.ActorService;
import com.viene.common.exception.ApiException;
import com.viene.common.exception.ResourceNotFoundException;
import com.viene.event.EventService;
import com.viene.report.dto.CreateReportRequest;
import com.viene.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private static final String ATOR = "ator";
    private static final String EVENTO = "evento";

    private final ReportRepository reportRepository;
    private final ActorService actorService;
    private final EventService eventService;

    public List<Report> findAll() {
        return reportRepository.findAll();
    }

    public Report create(CreateReportRequest request, User reporter) {
        String type = validateType(request.type());
        String name = type.equals(ATOR)
                ? actorService.findApprovedById(request.targetId()).getName()
                : eventService.findApprovedById(request.targetId()).getTitle();

        Report report = Report.builder()
                .type(type)
                .targetId(request.targetId())
                .name(name)
                .reason(request.reason())
                .reportedBy(reporter)
                .build();

        return reportRepository.save(report);
    }

    public void delete(Long id) {
        if (!reportRepository.existsById(id)) {
            throw new ResourceNotFoundException("Denúncia não encontrada: " + id);
        }
        reportRepository.deleteById(id);
    }

    private String validateType(String type) {
        String normalized = type == null ? "" : type.toLowerCase();
        if (!normalized.equals(ATOR) && !normalized.equals(EVENTO)) {
            throw new ApiException("Tipo inválido: deve ser \"ator\" ou \"evento\".", HttpStatus.BAD_REQUEST);
        }
        return normalized;
    }
}
