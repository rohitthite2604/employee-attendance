package com.example.employee_attendance.service;

import com.example.employee_attendance.model.LeaveCount;
import com.example.employee_attendance.model.LeaveRequest;
import com.example.employee_attendance.repository.LeaveCountRepository;
import com.example.employee_attendance.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private LeaveCountRepository leaveCountRepository;

    public LeaveRequest applyForLeave(Long userId, Long lcId, LocalDate startDate, LocalDate endDate, String description) {
        LeaveCount leaveCount = leaveCountRepository.findById(lcId)
                .orElseThrow(() -> new RuntimeException("LeaveCount not found"));

        int daysRequested = (int) (endDate.toEpochDay() - startDate.toEpochDay()) + 1;

        if (leaveCount.getRemainingLeaves() < daysRequested) {
            throw new RuntimeException("Insufficient leave balance");
        }
        LeaveRequest leaveRequest = new LeaveRequest();
        leaveRequest.setEmployee(leaveCount.getUser());
        leaveRequest.setLeaveCount(leaveCount);
        leaveRequest.setStartDate(startDate);
        leaveRequest.setEndDate(endDate);
        leaveRequest.setDescription(description);
        leaveRequest.setStatus("Pending");
        leaveRequest.setAppliedDate(LocalDate.now());

        leaveCount.setUsedLeaves(leaveCount.getUsedLeaves() + daysRequested);
        leaveCount.setRemainingLeaves(leaveCount.getRemainingLeaves() - daysRequested);

        leaveCountRepository.save(leaveCount);
        return leaveRequestRepository.save(leaveRequest);
    }
}
