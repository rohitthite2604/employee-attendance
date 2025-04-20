package com.example.employee_attendance.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.employee_attendance.model.Attendance;
import com.example.employee_attendance.model.AttendanceStatus;
import com.example.employee_attendance.model.User;
import com.example.employee_attendance.repository.AttendanceRepository;
import com.example.employee_attendance.repository.UserRepository;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private UserRepository userRepository;


    public String checkIn(Long userId){
        Optional<Attendance> existingAttendance = attendanceRepository.findByUserIdAndDate(userId, LocalDate.now());
        if(existingAttendance.isPresent()){
            throw new IllegalStateException("User already checked in today.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Attendance attendance = new Attendance();
        attendance.setUser(user);
        attendance.setDate(LocalDate.now());
        attendance.setCheckIn(LocalTime.now());
        attendance.setStatus(AttendanceStatus.PRESENT);
        attendanceRepository.save(attendance);
        return "Check-in successful for user ID: " + userId;
    }

    public String checkOut(Long userId){
        Attendance attendance = attendanceRepository.findByUserIdAndDate(userId, LocalDate.now())
                .orElseThrow(() -> new RuntimeException("No check-in record found for today."));

        if (attendance.getCheckOut() != null) {
            throw new IllegalStateException("Already checked out for today.");
        }

        attendance.setCheckOut(LocalTime.now());
        Duration duration = Duration.between(attendance.getCheckIn(), attendance.getCheckOut());
        attendance.setDuration(duration);
        attendanceRepository.save(attendance);
        return "Check-out successful for user ID: " + userId;
    }

    public List<Attendance> getUserAttendance(Long userId){
        return attendanceRepository.findAllByUserId(userId);
    }

    public List<Attendance> getAllAttendance(){
        return attendanceRepository.findAll();
    }
    
    
}
