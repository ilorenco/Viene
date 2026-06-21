package com.viene.report;

import com.viene.report.dto.CreateReportRequest;
import com.viene.report.dto.ReportResponse;
import com.viene.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/denuncias")
    @ResponseStatus(HttpStatus.CREATED)
    public ReportResponse create(@Valid @RequestBody CreateReportRequest request, @AuthenticationPrincipal User user) {
        return ReportResponse.from(reportService.create(request, user));
    }

    @GetMapping("/admin/denuncias")
    @PreAuthorize("hasRole('ADMIN')")
    public List<ReportResponse> findAll() {
        return reportService.findAll().stream().map(ReportResponse::from).toList();
    }

    @DeleteMapping("/admin/denuncias/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        reportService.delete(id);
    }
}
