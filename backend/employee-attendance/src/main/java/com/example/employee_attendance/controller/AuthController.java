// controller/AuthController.java
package com.example.employee_attendance.controller;

import com.example.employee_attendance.dto.LoginRequest;
import com.example.employee_attendance.dto.LoginResponse;
import com.example.employee_attendance.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}
