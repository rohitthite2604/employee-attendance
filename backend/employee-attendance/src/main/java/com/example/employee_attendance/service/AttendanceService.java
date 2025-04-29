package com.example.employee_attendance.service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
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


    public Map<String, Object> checkIn(Long userId, LocalDate date) {
        if (date == null) {
            date = LocalDate.now(); // Default to today's date if no date is provided
        }
        Optional<Attendance> existingAttendance = attendanceRepository.findByUserIdAndDate(userId, LocalDate.now());
        if (existingAttendance.isPresent()) {
            Attendance existing = existingAttendance.get();
            if (existing.getStatus() == AttendanceStatus.ON_LEAVE) {
                throw new IllegalStateException("On leave today. Cannot mark attendance.");
            }
            throw new IllegalStateException("Already checked in today.");
        }
        
    
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    
        Attendance attendance = new Attendance();
        attendance.setUser(user);
        attendance.setDate(LocalDate.now());
        attendance.setCheckIn(LocalTime.now());
        attendance.setStatus(AttendanceStatus.PRESENT);
        attendanceRepository.save(attendance);
    
        return Map.of(
            "message", "Check-in successful for user ID: " + userId,
            "status", "success"
        );
    }

    public Map<String, Object> checkOut(Long userId, LocalDate date) {
        if (date == null) {
            date = LocalDate.now(); // Default to today's date if no date is provided
        }
        Attendance attendance = attendanceRepository.findByUserIdAndDate(userId, LocalDate.now())
                .orElseThrow(() -> new RuntimeException("No check-in record found for today."));
    
        if (attendance.getCheckOut() != null) {
            throw new IllegalStateException("Already checked out for today.");
        }
    
        attendance.setCheckOut(LocalTime.now());
        Duration duration = Duration.between(attendance.getCheckIn(), attendance.getCheckOut());
        attendance.setDuration(duration);
        attendanceRepository.save(attendance);
    
        return Map.of(
            "message", "Check-out successful for user ID: " + userId,
            "status", "success"
        );
    }

    public List<Attendance> getUserAttendance(Long userId){
        return attendanceRepository.findAllByUserId(userId);
    }

    public List<Attendance> getAllAttendance(){
        List<Attendance> allRecords = attendanceRepository.findAll();
        LocalDate today = LocalDate.now();

        // Find all users
        List<User> allUsers = userRepository.findAll();

        // Get userIds that already have a record for today
        List<Long> presentTodayIds = allRecords.stream()
                .filter(a -> a.getDate().equals(today))
                .map(a -> a.getUser().getUserId())
                .toList();

        // Add virtual ABSENT records for users without a record today
        for (User user : allUsers) {
            if (!presentTodayIds.contains(user.getUserId())) {
                Attendance absent = new Attendance();
                absent.setUser(user);
                absent.setDate(today);
                absent.setStatus(AttendanceStatus.ABSENT);
                absent.setCheckIn(null);
                absent.setCheckOut(null);
                absent.setDuration(null);

                allRecords.add(absent);
            }
        }

        return allRecords;
    }

}
