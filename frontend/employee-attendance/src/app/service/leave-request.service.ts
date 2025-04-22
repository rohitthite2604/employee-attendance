import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LeaveRequest {
  lrId: number;
  employee: {
    userName: string;
  };
  leaveCount: {
    leaveType: {
      leaveType: string;
    };
  };
  appliedDate: string;
  startDate: string;
  endDate: string;
  description: string;
  status: string;
}

export interface LeaveRequestByUser {
  lrId: number;
  employee: {
    userId: number;
    userName: string;
  };
  leaveCount: {
    leaveType: {
      leaveType: string;
    };
  };
  appliedDate: string;
  startDate: string;
  endDate: string;
  description: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getLeaveCounts(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/leave-counts/user/${userId}`);
  }

  applyForLeave(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/leave-requests/apply`, payload);
  }

  assignLeaveTypes(userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/leave-counts/assign`, { userId });
  }

  getLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.baseUrl}/leave-requests`);
  }

  getLeaveRequestsByUserId(userId: number): Observable<LeaveRequestByUser[]> {
    return this.http.get<LeaveRequestByUser[]>(`${this.baseUrl}/leave-requests/user/${userId}`);
  }

  updateLeaveStatus(lrId: number, status: string): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(`${this.baseUrl}/leave-requests/status/${lrId}?status=${status}`, {});
  }
}
