package com.example.employee_attendance.controller;

import com.example.employee_attendance.model.LeaveType;
import com.example.employee_attendance.service.LeaveTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave-types")
@CrossOrigin(origins = "*")
public class LeaveTypeController {

    @Autowired
    private LeaveTypeService leaveTypeService;

    @PostMapping()
    public ResponseEntity<LeaveType> createLeaveType(@RequestBody LeaveType leaveType){
        LeaveType createdLeaveType = leaveTypeService.createLeaveType(leaveType);
        return ResponseEntity.ok(createdLeaveType);
    }

    @GetMapping()
    public ResponseEntity<List<LeaveType>> getAllLeaveTypes(){
        List<LeaveType> leaveTypes = leaveTypeService.getAllLeaveTypes();
        return ResponseEntity.ok(leaveTypes);
    }

    

}
