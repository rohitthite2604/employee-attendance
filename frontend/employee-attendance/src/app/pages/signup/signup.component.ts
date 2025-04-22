import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeaveRequestService } from '../../service/leave-request.service';

export enum UserRole {
  EMPLOYEE = 'EMPLOYEE',
  HR = 'HR',
  MANAGER = 'MANAGER'
}

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  chapters: any[] = [];
  designations: any[] = [];
  roles = Object.values(UserRole);

  signupForm: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private leaveRequestService: LeaveRequestService) {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      dateOfJoining: [''],
      designationId: [null, Validators.required],
      address: [''],
      chapterId: [null, Validators.required],
      role: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/api/chapters').subscribe({
      next: (data) => this.chapters = data,
      error: (err) => alert('Failed to load chapters')
    });

    this.http.get<any[]>('http://localhost:8080/api/designations').subscribe({
      next: (data) => this.designations = data,
      error: (err) => alert('Failed to load designations')
    });

  }

  onSubmit() {
    const formValue = this.signupForm.value;

    const requestBody = {
      ...formValue,
      chapter: {
        chId: formValue.chapterId
      },
      designation: {
        designId: formValue.designationId
      }
    };
    delete requestBody.chapterId;
    delete requestBody.designationId;

    this.http.post('http://localhost:8080/auth/signup', requestBody).subscribe({
      next: res => {
        const userId = (res as { userId: number }).userId;
        alert('User registered! 🎉');
        this.router.navigate(['/login']);
        this.leaveRequestService.assignLeaveTypes(userId).subscribe({
          next: (response) => {
            console.log('Assign Leave Types Response:', response); 
            alert('Leave types assigned successfully!');
             // Redirect to login page
          }
        });
      }
    });
  }

}
