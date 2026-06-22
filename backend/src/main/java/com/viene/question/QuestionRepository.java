package com.viene.question;

import com.viene.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByAskedBy(User askedBy);
}
