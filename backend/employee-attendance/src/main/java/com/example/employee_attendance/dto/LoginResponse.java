package com.example.employee_attendance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String message;
    private Long userId;
    private String userName;
    private String role;

}
