package com.example.employee_attendance.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class LeaveType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ltId;

    private String leaveType; // e.g. Sick, Casual, Annual
    private Integer totalLeaves;

    @ManyToOne
    @JoinColumn(name = "hId")
    private User hr; // HR who defined it
}
