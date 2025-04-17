package com.example.employee_attendance.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Chapter {
    @Id
    @GeneratedValue
    private Long chId;
    @SuppressWarnings("unused")
    @Column(name = "ch_name")
    private String chName;

}
