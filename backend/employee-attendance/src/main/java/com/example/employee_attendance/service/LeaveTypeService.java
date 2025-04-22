package com.example.employee_attendance.service;

import com.example.employee_attendance.model.LeaveType;
import com.example.employee_attendance.repository.LeaveTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaveTypeService {

    @Autowired
    private LeaveTypeRepository leaveTypeRepository;

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
            return leaveTypeRepository.save(existingLeaveType);
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
