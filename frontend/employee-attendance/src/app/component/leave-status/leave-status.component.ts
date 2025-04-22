import { Component, OnInit } from '@angular/core';
import { LeaveRequestByUser, LeaveRequestService } from '../../service/leave-request.service';
import { AuthService } from '../../service/auth.service';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-leave-status',
  imports: [NgClass, NgFor],
  templateUrl: './leave-status.component.html',
  styleUrl: './leave-status.component.css'
})
export class LeaveStatusComponent implements OnInit{
  userId = 0;
  leaveRequestsByUser: LeaveRequestByUser[] = [];
  
  constructor(private leaveRequestService: LeaveRequestService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId === null || isNaN(userId)) {
      console.error('User ID not found or invalid!');
      return;
    }
    this.userId = userId;

    this.leaveRequestService.getLeaveRequestsByUserId(userId).subscribe(
      (data) => {
        this.leaveRequestsByUser = data;
      },
      (error) => {
        console.error('Error fetching leave requests:', error);
      }
    );
  }

}
