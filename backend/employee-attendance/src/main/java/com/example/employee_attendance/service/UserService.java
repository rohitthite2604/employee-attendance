package com.example.employee_attendance.service;

import com.example.employee_attendance.model.Chapter;
import com.example.employee_attendance.model.Designation;
import com.example.employee_attendance.model.User;
import com.example.employee_attendance.repository.ChapterRepository;
import com.example.employee_attendance.repository.DesignationRepository;
import com.example.employee_attendance.repository.UserRepository;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private DesignationRepository designationRepository;


     public User register(User user) {
        // Check if the email is already registered
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

         Long chId = user.getChapter().getChId();
    Chapter chapter = chapterRepository.findById(chId)
            .orElseThrow(() -> new RuntimeException("Chapter not found with ID: " + chId));

     // Set the fetched chapter to the user
    user.setChapter(chapter);

         Long designId = user.getDesignation().getDesignId();
         Designation designation = designationRepository.findById(designId)
                 .orElseThrow(() -> new RuntimeException("Designation not found with ID: " + designId));

         // Set the fetched chapter to the user
         user.setDesignation(designation);

        // Set the date of joining to the current date if not provided
        if (user.getDateOfJoining() == null) {
            user.setDateOfJoining(LocalDate.now());
        }

        // Save the new user
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }
}
