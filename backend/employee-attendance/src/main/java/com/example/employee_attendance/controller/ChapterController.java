package com.example.employee_attendance.controller;

import com.example.employee_attendance.model.Chapter;
import com.example.employee_attendance.repository.ChapterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chapters")
@CrossOrigin(origins = "*") // Allows frontend to call the API
public class ChapterController {

    @Autowired
    private ChapterRepository chapterRepository;

    @GetMapping
    public List<Chapter> getAllChapters() {
        return chapterRepository.findAll();
    }
}
