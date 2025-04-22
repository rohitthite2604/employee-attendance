package com.example.employee_attendance.controller;

import com.example.employee_attendance.model.LeaveRequest;
import com.example.employee_attendance.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/leave-requests")
@CrossOrigin(origins = "*")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    @PostMapping("/apply")
    public ResponseEntity<LeaveRequest> applyForLeave(@RequestBody Map<String, Object> payload){
        Long userId = ((Number) payload.get("userId")).longValue();
        Long lcId = ((Number) payload.get("lcId")).longValue();
        LocalDate startDate = LocalDate.parse((String) payload.get("startDate"));
        LocalDate endDate = LocalDate.parse((String) payload.get("endDate"));
        String description = (String) payload.get("descripion");

        LeaveRequest leaveRequest = leaveRequestService.applyForLeave(userId, lcId, startDate, endDate, description);
        return ResponseEntity.ok(leaveRequest);
    }
}