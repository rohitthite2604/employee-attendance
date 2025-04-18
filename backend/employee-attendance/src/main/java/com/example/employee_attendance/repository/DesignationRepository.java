package com.example.employee_attendance.repository;

import com.example.employee_attendance.model.Designation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DesignationRepository extends JpaRepository<Designation, Long> {
}
