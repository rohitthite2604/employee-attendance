package com.example.employee_attendance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.employee_attendance.model.Chapter;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {
}
