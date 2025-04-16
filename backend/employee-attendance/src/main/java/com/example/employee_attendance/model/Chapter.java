package com.example.employee_attendance.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Chapter {
    @Id
    @GeneratedValue
    private Long chId;
    @SuppressWarnings("unused")
    private String chName;

}
