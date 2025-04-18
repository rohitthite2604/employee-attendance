package com.example.employee_attendance.controller;

import com.example.employee_attendance.model.Designation;
import com.example.employee_attendance.repository.DesignationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/designations")
@CrossOrigin(origins = "*") // Allows frontend to call the API
public class DesignationController {

    @Autowired
    private DesignationRepository designationRepository;

    @GetMapping
    public List<Designation> getAllDesignations() {
        return designationRepository.findAll();
    }
}
