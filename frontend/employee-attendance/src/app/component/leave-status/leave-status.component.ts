import { Component, OnInit } from '@angular/core';
import { LeaveRequestByUser, LeaveRequestService } from '../../service/leave-request.service';
import { AuthService } from '../../service/auth.service';
import { NgClass, NgFor } from '@angular/common';
import { formatDate } from '../../utils/formatting.utils';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-leave-status',
  imports: [NgClass, NgFor, MatPaginatorModule],
  templateUrl: './leave-status.component.html',
  styleUrl: './leave-status.component.css'
})
export class LeaveStatusComponent implements OnInit{
  userId = 0;
  leaveRequestsByUser: LeaveRequestByUser[] = [];
  pageSize = 5;
  pageIndex = 0;
  paginatedLeaveRequestsByUser: LeaveRequestByUser[] = [];

  
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
        this.leaveRequestsByUser = data
        .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
        .map((request) => ({
          ...request,
          appliedDate: formatDate(request.appliedDate),
          startDate: formatDate(request.startDate),
          endDate: formatDate(request.endDate)
      }));
      this.updatePaginatedLeaveRequests();
      },
      (error) => {
        console.error('Error fetching leave requests:', error);
      }
    );
  }

  updatePaginatedLeaveRequests(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedLeaveRequestsByUser = this.leaveRequestsByUser.slice(startIndex, endIndex);
  }
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedLeaveRequests();
  }
  

}
