package com.example.employee_attendance.controller;

import com.example.employee_attendance.model.LeaveType;
import com.example.employee_attendance.service.LeaveTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


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

    @PutMapping("/{id}")
    public ResponseEntity<LeaveType> updateLeaveType(@PathVariable Long id, @RequestBody LeaveType leaveType) {
        return leaveTypeService.updateLeaveType(id, leaveType)
                .map(updatedLeaveType -> ResponseEntity.ok(updatedLeaveType))
                .orElse(ResponseEntity.notFound().build());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLeaveType(@PathVariable Long id){
        boolean isDeleted = leaveTypeService.deleteLeaveType(id);
        return  isDeleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
    
    

}
