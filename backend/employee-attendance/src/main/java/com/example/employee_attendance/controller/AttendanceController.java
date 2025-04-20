package com.example.employee_attendance.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.employee_attendance.model.Attendance;
import com.example.employee_attendance.service.AttendanceService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping("/check-in")
public ResponseEntity<?> checkIn(@RequestParam Long userId, @RequestParam(required = false) String date) {
    try {
        LocalDate parsedDate = date != null ? LocalDate.parse(date) : null;
        Map<String, Object> response = attendanceService.checkIn(userId, parsedDate);
        return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body(Map.of(
            "message", e.getMessage(),
            "status", "error"
        ));
    }
}

@PostMapping("/check-out")
public ResponseEntity<?> checkOut(@RequestParam Long userId, @RequestParam(required = false) String date) {
    try {
        LocalDate parsedDate = date != null ? LocalDate.parse(date) : null;
        Map<String, Object> response = attendanceService.checkOut(userId, parsedDate);
        return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
        return ResponseEntity.badRequest().body(Map.of(
            "message", e.getMessage(),
            "status", "error"
        ));
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
