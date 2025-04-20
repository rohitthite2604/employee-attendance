package com.example.employee_attendance.repository;

import com.example.employee_attendance.model.Attendance;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    @Query("SELECT a FROM Attendance a WHERE a.user.userId = :userId AND a.date = :date")
     Optional<Attendance> findByUserIdAndDate(Long userId, LocalDate date);

    @Query("SELECT a FROM Attendance a WHERE a.user.userId = :userId")
    List<Attendance> findAllByUserId(@Param("userId") Long userId);
}