import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LeaveType {
  id: number;
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
}
