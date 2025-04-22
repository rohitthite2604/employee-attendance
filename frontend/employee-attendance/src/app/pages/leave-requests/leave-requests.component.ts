import { Component, OnInit } from '@angular/core';
import { LeaveRequest, LeaveRequestService } from '../../service/leave-request.service';
import { NgClass, NgFor } from '@angular/common';

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
      this.leaveRequests = data;
  });
}

updateStatus(lrId: number, status: string): void {
  this.leaveRequestService.updateLeaveStatus(lrId, status).subscribe(updatedRequest => {
    const index = this.leaveRequests.findIndex(lr => lr.lrId === lrId);
    if (index !== -1) {
      this.leaveRequests[index] = updatedRequest;
    }
  });
}

getStatusClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'Approved':
      return 'bg-green-100 text-green-800';
    case 'Rejected':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';

  }

}


}
