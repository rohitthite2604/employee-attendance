import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  duration: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private baseUrl = 'http://localhost:8080/api/attendance';

  constructor(private http: HttpClient) { }

  checkIn(userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/check-in?userId=${userId}`, {});
}

checkOut(userId: number): Observable<any> {
  return this.http.post(`${this.baseUrl}/check-out?userId=${userId}`, {});
}

getUserAttendance(userId: number): Observable<AttendanceRecord[]> {
  return this.http.get<AttendanceRecord[]>(`${this.baseUrl}/user/${userId}`);
}

private attendanceUpdated = new Subject<void>();
  attendanceUpdated$ = this.attendanceUpdated.asObservable();

  notifyAttendanceUpdated(): void {
    this.attendanceUpdated.next();
  }

}
