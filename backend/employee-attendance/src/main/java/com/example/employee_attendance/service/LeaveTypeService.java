package com.example.employee_attendance.service;

import com.example.employee_attendance.model.LeaveCount;
import com.example.employee_attendance.model.LeaveType;
import com.example.employee_attendance.repository.LeaveCountRepository;
import com.example.employee_attendance.repository.LeaveTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaveTypeService {

    @Autowired
    private LeaveTypeRepository leaveTypeRepository;

    @Autowired
    private LeaveCountRepository leaveCountRepository;

    public LeaveType createLeaveType(LeaveType leaveType){
        return leaveTypeRepository.save(leaveType);
    }

    public List<LeaveType> getAllLeaveTypes(){
        return leaveTypeRepository.findAll();
    }

    public Optional<LeaveType> updateLeaveType(Long id, LeaveType updatedLeaveType){
        return leaveTypeRepository.findById(id).map(existingLeaveType -> {
            existingLeaveType.setLeaveType(updatedLeaveType.getLeaveType());
            existingLeaveType.setTotalLeaves(updatedLeaveType.getTotalLeaves());

            LeaveType savedLeaveType = leaveTypeRepository.save(existingLeaveType);

            // Update related LeaveCount entities
            List<LeaveCount> leaveCounts = leaveCountRepository.findByLeaveType(savedLeaveType);
            for (LeaveCount leaveCount : leaveCounts) {
                int usedLeaves = leaveCount.getUsedLeaves();
                int newRemaining = savedLeaveType.getTotalLeaves() - usedLeaves;
                leaveCount.setRemainingLeaves(Math.max(newRemaining, 0));
                leaveCountRepository.save(leaveCount);
            }

            return savedLeaveType;
        });
    }


    public boolean deleteLeaveType(Long id){
        if(leaveTypeRepository.existsById(id)){
            leaveTypeRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
