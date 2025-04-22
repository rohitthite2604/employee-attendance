package com.example.employee_attendance.repository;

import com.example.employee_attendance.model.LeaveCount;
import com.example.employee_attendance.model.LeaveType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LeaveTypeRepository extends JpaRepository<LeaveType, Long> {

}
