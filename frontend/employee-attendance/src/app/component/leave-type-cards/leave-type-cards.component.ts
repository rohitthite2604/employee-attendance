import { Component, Input, OnInit } from '@angular/core';
import { LeaveType, LeaveTypeService } from '../../service/leave-type.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave-type-cards',
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './leave-type-cards.component.html',
  styleUrl: './leave-type-cards.component.css'
})

export class LeaveTypeCardsComponent implements OnInit {
  @Input() leaveTypes: LeaveType[] = [];
  showUpdateForm: boolean = false; // To toggle the update form
  selectedLeaveType: LeaveType = {
    ltId: 0,
    leaveType: '',
    totalLeaves: 0,
  };

  constructor(private leaveTypeService: LeaveTypeService) {}

  ngOnInit(): void {
    this.fetchLeaveTypes();
  }
  fetchLeaveTypes(): void {
    this.leaveTypeService.getLeaveTypes().subscribe(
      (data) => {
        this.leaveTypes = data;
      },
      (error) => {
        console.error('Failed to fetch leave types:', error);
      }
    );
  }

  openUpdateForm(leaveType: LeaveType): void {
    this.selectedLeaveType = { ...leaveType }; // Clone the leave type to avoid direct mutation
    this.showUpdateForm = true;
  }

  closeUpdateForm(): void {
    this.showUpdateForm = false;
    this.selectedLeaveType = {
      ltId: 0,
      leaveType: '',
      totalLeaves: 0,
    };
  }

  updateLeaveType(): void {
    if (this.selectedLeaveType) {
      this.leaveTypeService.updateLeaveType(this.selectedLeaveType.ltId, {
        leaveType: this.selectedLeaveType.leaveType,
        totalLeaves: this.selectedLeaveType.totalLeaves,
      }).subscribe(
        (response) => {
          console.log('Leave type updated successfully:', response);
          this.fetchLeaveTypes(); // Refresh the list
          this.closeUpdateForm(); // Close the form
        },
        (error) => {
          console.error('Failed to update leave type:', error);
        }
      );
    }
  }

  deleteLeaveType(ltId: number): void {
    if (confirm('Are you sure you want to delete this leave type?')) {
      this.leaveTypeService.deleteLeaveType(ltId).subscribe(
        (response) => {
          console.log('Leave type deleted successfully:', response);
          this.fetchLeaveTypes(); // Refresh the list
        },
        (error) => {
          console.error('Failed to delete leave type:', error);
        }
      );
    }
  }

}
