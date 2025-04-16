// service/UserService.java
package com.example.employee_attendance.service;

import com.example.employee_attendance.dto.LoginRequest;
import com.example.employee_attendance.dto.LoginResponse;
import com.example.employee_attendance.model.User;
import com.example.employee_attendance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmailAndPassword(request.getEmail(), request.getPassword())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        return new LoginResponse("Login Successful", user.getUserId(), user.getUserName(), user.getRole().getRoleName());
    }
}
    