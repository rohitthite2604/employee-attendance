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

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }
  
  setUserRole(role: string): void {
    localStorage.setItem('userRole', role);
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  setUserName(userName: string): void {
    localStorage.setItem('userName', userName);
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  setPhoneNumber(phoneNumber: string): void {
    localStorage.setItem('phoneNumber', phoneNumber);
  }

  getPhoneNumber(): string | null {
    return localStorage.getItem('phoneNumber');
  }

  setEmail(email: string): void {
    localStorage.setItem('email', email);
  }
  
  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  
  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  setChapterId(chapterId: string): void {
  localStorage.setItem('chapterId', chapterId);
}

getChapterId(): string | null {
  return localStorage.getItem('chapterId');
}

setDesignationId(designationId: string): void {
  localStorage.setItem('designationId', designationId);
}

getDesignationId(): string | null {
  return localStorage.getItem('designationId');
}

setChapterName(chapterName: string): void {
  localStorage.setItem('chapterName', chapterName);
}

// Get Chapter Name
getChapterName(): string | null {
  return localStorage.getItem('chapterName');
}

// Save Designation Name
setDesignationName(designationName: string): void {
  localStorage.setItem('designationName', designationName);
}

// Get Designation Name
getDesignationName(): string | null {
  return localStorage.getItem('designationName');
}

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('email');
    localStorage.removeItem('chapterId');
    localStorage.removeItem('designationId');
    localStorage.removeItem('chapterName');        // 🆕
    localStorage.removeItem('designationName');    // 🆕
}
}
