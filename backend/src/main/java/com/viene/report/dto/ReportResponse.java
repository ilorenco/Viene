package com.viene.report.dto;

import com.viene.report.Report;

public record ReportResponse(Long id, String name, String type, String reason, String date) {

    public static ReportResponse from(Report report) {
        var createdAt = report.getCreatedAt();
        String date = "%02d/%02d/%04d".formatted(
                createdAt.getDayOfMonth(), createdAt.getMonthValue(), createdAt.getYear());

        return new ReportResponse(report.getId(), report.getName(), report.getType(), report.getReason(), date);
    }
}
