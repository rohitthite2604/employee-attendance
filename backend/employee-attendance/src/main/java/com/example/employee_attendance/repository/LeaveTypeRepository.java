package com.example.employee_attendance.repository;

import com.example.employee_attendance.model.LeaveType;
import org.springframework.data.jpa.repository.JpaRepository;


public interface LeaveTypeRepository extends JpaRepository<LeaveType, Long> {

}
