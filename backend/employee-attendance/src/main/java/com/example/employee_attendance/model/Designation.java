package com.example.employee_attendance.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Designation {
    @Id
    @GeneratedValue
    private Long designId;
    @SuppressWarnings("unused")
    @Column(name = "design_name")
    private String designName;

}
