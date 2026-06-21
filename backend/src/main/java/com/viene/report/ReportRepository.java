package com.viene.report;

import com.viene.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {

    List<Report> findByReportedBy(User reportedBy);
}
