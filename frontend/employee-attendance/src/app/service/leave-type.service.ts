import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LeaveType {
  ltId: number;
  leaveType: string;
  totalLeaves: number;
}

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {
  private baseUrl = 'http://localhost:8080/api/leave-types';

  constructor(private http: HttpClient) { }

  getLeaveTypes(): Observable<LeaveType[]>{
    return this.http.get<LeaveType[]>(`${this.baseUrl}`);
  }

  addLeaveType(leaveType: {leaveType: string, totalLeaves: number}): Observable<LeaveType> {
    return this.http.post<LeaveType>(`${this.baseUrl}`, leaveType);
  }

  updateLeaveType(ltId: number, leaveType: { leaveType: string; totalLeaves: number }): Observable<LeaveType> {
    return this.http.put<LeaveType>(`${this.baseUrl}/${ltId}`, leaveType);
  }

  deleteLeaveType(ltId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${ltId}`);
  }
}
