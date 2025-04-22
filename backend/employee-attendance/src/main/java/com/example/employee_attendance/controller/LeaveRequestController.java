package com.example.employee_attendance.controller;

import com.example.employee_attendance.model.LeaveRequest;
import com.example.employee_attendance.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
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
        String description = (String) payload.get("description");

        LeaveRequest leaveRequest = leaveRequestService.applyForLeave(userId, lcId, startDate, endDate, description);
        return ResponseEntity.ok(leaveRequest);
    }

    @GetMapping
    public ResponseEntity<List<LeaveRequest>> getAllLeaveRequests() {
        List<LeaveRequest> leaveRequests = leaveRequestService.getAllLeaveRequests();
        return ResponseEntity.ok(leaveRequests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeaveRequest> getLeaveRequestById(@PathVariable Long id) {
        return leaveRequestService.getLeaveRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LeaveRequest>> getLeaveRequestsByUserId(@PathVariable Long userId) {
        List<LeaveRequest> leaveRequests = leaveRequestService.getLeaveRequestsByUserId(userId);
        if (leaveRequests.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(leaveRequests);
    }
}