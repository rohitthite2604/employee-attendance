import { Component } from '@angular/core';
import { LeaveType, LeaveTypeService } from '../../service/leave-type.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { LeaveTypeCardsComponent } from '../../component/leave-type-cards/leave-type-cards.component';

@Component({
  selector: 'app-leave-types',
  imports: [FormsModule, LeaveTypeCardsComponent, NgIf],
  templateUrl: './leave-types.component.html',
  styleUrl: './leave-types.component.css'
})
export class LeaveTypesComponent {
  leaveTypes: LeaveType[] = [];
  newLeaveType = { leaveType: '', totalLeaves: 0 };
  showPopup = false;

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
      this.newLeaveType = { leaveType: '', totalLeaves: 0 };
      this.showPopup = false; // Reset the form
    });
  }

  openPopup(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

}
