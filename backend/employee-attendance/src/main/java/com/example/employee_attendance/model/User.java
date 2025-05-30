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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "design_id", referencedColumnName = "designId")
    private Designation designation;

    private String address;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ch_id", referencedColumnName = "chId")
    private Chapter chapter;

    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
}
