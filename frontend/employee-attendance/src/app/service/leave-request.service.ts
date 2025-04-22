import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
