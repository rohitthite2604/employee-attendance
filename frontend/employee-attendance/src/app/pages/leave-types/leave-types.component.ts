import { Component } from '@angular/core';
import { LeaveType, LeaveTypeService } from '../../service/leave-type.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-leave-types',
  imports: [FormsModule, NgFor],
  templateUrl: './leave-types.component.html',
  styleUrl: './leave-types.component.css'
})
export class LeaveTypesComponent {
  leaveTypes: LeaveType[] = [];
  newLeaveType = { leaveType: '', totalLeaves: 0 };

  constructor(private leaveTypeService: LeaveTypeService) { }

  ngOnInit(): void {
    this.fetchLeaveTypes();
  }

  fetchLeaveTypes(): void {
    this.leaveTypeService.getLeaveTypes().subscribe(data => {
      this.leaveTypes = data;
    });
  }

  addLeaveType(): void {
    if (!this.newLeaveType.leaveType || this.newLeaveType.totalLeaves <= 0) {
      alert('Please provide valid leave type details.');
      return;
    }

    this.leaveTypeService.addLeaveType(this.newLeaveType).subscribe(newType => {
      this.leaveTypes.push(newType); // Add the new leave type to the list
      this.newLeaveType = { leaveType: '', totalLeaves: 0 }; // Reset the form
    });
  }

}
