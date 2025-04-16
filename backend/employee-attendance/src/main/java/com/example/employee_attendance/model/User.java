package com.example.employee_attendance.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Setter
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String userName;
    private String phoneNumber;
    private String email;
    private String password;
    private LocalDate dateOfJoining;
    private String designation;
    private String address;

    @ManyToOne
    @JoinColumn(name = "ch_id")
    private Chapter chapter;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}
