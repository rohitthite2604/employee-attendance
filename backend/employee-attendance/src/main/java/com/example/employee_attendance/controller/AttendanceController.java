package com.example.employee_attendance.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.employee_attendance.model.Attendance;
import com.example.employee_attendance.service.AttendanceService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/check-in")
    public ResponseEntity<String> checkIn(@RequestParam Long userId) {
        try{
            String message = attendanceService.checkIn(userId);
            return ResponseEntity.ok(message);
        }catch (IllegalStateException | NoSuchElementException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
    }

}

    @PostMapping("/check-out")
    public ResponseEntity<String> checkOut(@RequestParam Long userId) {
        try{
            String message = attendanceService.checkOut(userId);
            return ResponseEntity.ok(message);
        }catch (IllegalStateException | NoSuchElementException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Attendance>> getUserAttendance(@PathVariable Long userId) {
        List<Attendance> records = attendanceService.getUserAttendance(userId);
        return ResponseEntity.ok(records);
    }

    @GetMapping("/all")
    public  ResponseEntity<List<Attendance>> getAllAttendance() {
        List<Attendance> records = attendanceService.getAllAttendance();
        return ResponseEntity.ok(records);
    }
    
    

}
