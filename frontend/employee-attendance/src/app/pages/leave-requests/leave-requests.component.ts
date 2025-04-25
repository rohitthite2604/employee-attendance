import { Component, OnInit } from '@angular/core';
import { LeaveRequest, LeaveRequestService } from '../../service/leave-request.service';
import { NgClass, NgFor } from '@angular/common';
import { formatDate } from '../../utils/formatting.utils';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-leave-requests',
  imports: [NgFor, NgClass],
  templateUrl: './leave-requests.component.html',
  styleUrl: './leave-requests.component.css'
})
export class LeaveRequestsComponent implements OnInit {
  leaveRequests: LeaveRequest[] = []; // Holds leave requests

  constructor(private leaveRequestService: LeaveRequestService) { }

  ngOnInit(): void {
    this.leaveRequestService.getLeaveRequests().subscribe(data => {
      this.leaveRequests = data
      .sort((a,b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
      .map(request => ({
        ...request,
        appliedDate: formatDate(request.appliedDate),
        startDate: formatDate(request.startDate),
        endDate: formatDate(request.endDate)
      }));
  });
}

get approvedCount(): number {
  return this.leaveRequests.filter(request => request.status === 'Approved').length;
}
get rejectedCount(): number {
  return this.leaveRequests.filter(request => request.status === 'Rejected').length;
}
get pendingCount(): number {
  return this.leaveRequests.filter(request => request.status === 'Pending').length;
}

updateStatus(lrId: number, status: string): void {
  this.leaveRequestService.updateLeaveStatus(lrId, status).subscribe({
    next: updatedRequest => {
      const index = this.leaveRequests.findIndex(lr => lr.lrId === lrId);
      if (index !== -1) {
        this.leaveRequests[index] = {
          ...updatedRequest,
          appliedDate: formatDate(updatedRequest.appliedDate),
          startDate: formatDate(updatedRequest.startDate),
          endDate: formatDate(updatedRequest.endDate)
        };
      }
    },
    error: (error: HttpErrorResponse) => {
      // Show the error as an alert
      alert(error.error.message || 'An error occurred while updating the leave status.');
    }
  });
}

getStatusClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';

  }

}

confirmUpdateStatus(lrId: number, status: string): void {
  const request = this.leaveRequests.find(r => r.lrId === lrId);

  // Only allow updates for Pending leave requests
  if (request?.status !== 'Pending') {
    return;
  }

  const action = status === 'Approved' ? 'approve' : 'reject';
  const confirmAction = confirm(`Are you sure you want to ${action} this leave request?`);

  if (confirmAction) {
    this.updateStatus(lrId, status);
  }
}

}
