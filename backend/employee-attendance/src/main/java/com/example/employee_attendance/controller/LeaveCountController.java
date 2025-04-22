package com.example.employee_attendance.controller;

import com.example.employee_attendance.model.LeaveCount;
import com.example.employee_attendance.service.LeaveCountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leave-counts")
@CrossOrigin(origins="*")
public class LeaveCountController {

    @Autowired
    private LeaveCountService leaveCountService;

    @PostMapping("/assign")
public ResponseEntity<String> assignLeaveTypesToUser(@RequestBody Map<String, Object> payload) {
    Long userId = ((Number) payload.get("userId")).longValue();
    leaveCountService.assignLeaveTypesToUser(userId);
    return ResponseEntity.ok("Leave types assigned to user with ID: " + userId);
}

    @PutMapping("/update")
    public ResponseEntity<LeaveCount> updateLeaveCount(@RequestBody Map<String, Object> payload) {
        Long userId = ((Number) payload.get("userId")).longValue();
        Long ltId = ((Number) payload.get("ltId")).longValue();
        int daysRequested = ((Number) payload.get("daysRequested")).intValue();
        LeaveCount leaveCount = leaveCountService.updateLeaveCount(userId, ltId, daysRequested);
        return ResponseEntity.ok(leaveCount);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LeaveCount>> getLeaveCountsByUserId(@PathVariable Long userId) {
        List<LeaveCount> leaveCounts = leaveCountService.getLeaveCountsByUserId(userId);
        return ResponseEntity.ok(leaveCounts);
    }
}
