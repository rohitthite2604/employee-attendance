package com.example.employee_attendance.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long policyId;

    private String policyType; // e.g. Leave Policy, Work Policy

    @Enumerated(EnumType.STRING)
    private WorkMode workMode;

    @ManyToOne
    @JoinColumn(name = "hId")
    private User hr; // HR who created the policy
}
