package com.example.employee_attendance.service;

import com.example.employee_attendance.model.LeaveCount;
import com.example.employee_attendance.model.LeaveType;
import com.example.employee_attendance.model.User;
import com.example.employee_attendance.repository.LeaveCountRepository;
import com.example.employee_attendance.repository.LeaveTypeRepository;
import com.example.employee_attendance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaveCountService {

    @Autowired
    private LeaveCountRepository leaveCountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LeaveTypeRepository leaveTypeRepository;

public void assignLeaveTypesToUser(Long userId) {
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    List<LeaveType> leaveTypes = leaveTypeRepository.findAll();
    for (LeaveType leaveType : leaveTypes) {
        LeaveCount leaveCount = new LeaveCount();
        leaveCount.setUser(user);
        leaveCount.setLeaveType(leaveType);
        leaveCount.setUsedLeaves(0);
        leaveCount.setRemainingLeaves(leaveType.getTotalLeaves());
        leaveCountRepository.save(leaveCount);
    }
}


    public LeaveCount updateLeaveCount(Long userId, Long ltId, int daysRequested) {
        LeaveCount leaveCount = leaveCountRepository.findByUser_UserIdAndLeaveType_LtId(userId, ltId)
                .orElseThrow(() -> new RuntimeException("LeaveCount not found"));
        if (leaveCount.getRemainingLeaves() < daysRequested) {
            throw new RuntimeException("Insufficient leave balance");
        }
        leaveCount.setUsedLeaves(leaveCount.getUsedLeaves() + daysRequested);
        leaveCount.setRemainingLeaves(leaveCount.getRemainingLeaves() - daysRequested);
        return leaveCountRepository.save(leaveCount);
    }

    public List<LeaveCount> getLeaveCountsByUserId(Long userId) {
    return leaveCountRepository.findByUser_UserId(userId);
}
}
