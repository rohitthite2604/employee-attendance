package com.example.employee_attendance.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lrId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User employee;

    @ManyToOne
    @JoinColumn(name = "ltid")
    private LeaveType leaveType;

    @ManyToOne
    @JoinColumn(name = "mId")
    private User manager;

    private LocalDate startDate;
    private LocalDate endDate;
    private String description;
    private String status; // e.g. Pending, Approved, Rejected
    private LocalDate appliedDate;
}
