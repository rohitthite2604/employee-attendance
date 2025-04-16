import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth/login'; // Update if needed
  private http = inject(HttpClient);

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { email, password });
  }
}
