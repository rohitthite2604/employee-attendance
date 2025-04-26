import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Policy {
  policyId?: number;
  policyType: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private baseUrl = 'http://localhost:8080/api/policies';


  constructor(private http: HttpClient) { }

  getPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.baseUrl);
  }

  getPolicyById(policyId: number): Observable<Policy> {
    return this.http.get<Policy>(`${this.baseUrl}/${policyId}`);
  }

  addPolicy(policy: Policy): Observable<Policy> {
    return this.http.post<Policy>(this.baseUrl, policy);
  }

  updatePolicy(policy: Policy): Observable<Policy> {
    return this.http.put<Policy>(`${this.baseUrl}/${policy.policyId}`, policy);
  }

  deletePolicy(policyId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${policyId}`);
  }


}
