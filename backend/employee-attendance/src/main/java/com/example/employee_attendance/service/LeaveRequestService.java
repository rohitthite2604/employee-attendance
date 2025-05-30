package com.example.employee_attendance.service;

import com.example.employee_attendance.model.*;
import com.example.employee_attendance.repository.AttendanceRepository;
import com.example.employee_attendance.repository.LeaveCountRepository;
import com.example.employee_attendance.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private LeaveCountRepository leaveCountRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmailService emailService;

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

    public List<LeaveRequest> getAllLeaveRequests() {
        return leaveRequestRepository.findAll();
    }

    public Optional<LeaveRequest> getLeaveRequestById(Long id) {
        return leaveRequestRepository.findById(id);
    }

    public List<LeaveRequest> getLeaveRequestsByUserId(Long userId) {
        return leaveRequestRepository.findByEmployee_UserId(userId);
    }

    public LeaveRequest updateLeaveStatus(Long lrId, String status){
        Optional<LeaveRequest> optLeaveRequest = leaveRequestRepository.findById(lrId);
        if(optLeaveRequest.isPresent()){
            LeaveRequest leaveRequest = optLeaveRequest.get();
            if ("Approved".equalsIgnoreCase(leaveRequest.getStatus()) || "Rejected".equalsIgnoreCase(leaveRequest.getStatus())) {
                throw new RuntimeException("Cannot change the status of an already " + leaveRequest.getStatus() + " request.");
            }
            leaveRequest.setStatus(status);
            LeaveRequest updatedLeaveRequest = leaveRequestRepository.save(leaveRequest);

        if ("Approved".equalsIgnoreCase(status)) {
            LocalDate startDate = leaveRequest.getStartDate();
            LocalDate endDate = leaveRequest.getEndDate();
            User employee = leaveRequest.getEmployee();

            for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
                Attendance attendance = new Attendance();
                attendance.setUser(employee);
                attendance.setDate(date);
                attendance.setStatus(AttendanceStatus.ON_LEAVE);
                attendanceRepository.save(attendance);
            }
            EmailDetails mail = new EmailDetails();
            mail.setRecipient(employee.getEmail());
            mail.setSubject("Leave Request Approved");
            mail.setMsgBody("Hello " + employee.getUserName() + ",\n\nYour leave request from " + startDate + " to " + endDate + " has been approved.");
            emailService.sendSimpleMail(mail);

        }else if ("Rejected".equalsIgnoreCase(status)) {
            LeaveCount leaveCount = leaveRequest.getLeaveCount();
            int daysRequested = (int) (leaveRequest.getEndDate().toEpochDay() - leaveRequest.getStartDate().toEpochDay()) + 1;
            leaveCount.setUsedLeaves(leaveCount.getUsedLeaves() - daysRequested);
            leaveCount.setRemainingLeaves(leaveCount.getRemainingLeaves() + daysRequested);
            leaveCountRepository.save(leaveCount);

            User employee = leaveRequest.getEmployee();
            EmailDetails mail = new EmailDetails();
            mail.setRecipient(employee.getEmail());
            mail.setSubject("Leave Request Rejected");
            mail.setMsgBody("Hello " + employee.getUserName() + ",\n\nYour leave request from " +
                    leaveRequest.getStartDate() + " to " + leaveRequest.getEndDate() + " has been rejected.");
            emailService.sendSimpleMail(mail);
        }

        return updatedLeaveRequest;
    } else {
        throw new RuntimeException("Leave Request not found");
    }
    }
}
