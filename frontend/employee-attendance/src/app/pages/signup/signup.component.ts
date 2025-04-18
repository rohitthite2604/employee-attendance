import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  roles = Object.values(UserRole);

  signupForm: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      dateOfJoining: [''],
      designation: [''],
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

  }

  onSubmit() {
    const formValue = this.signupForm.value;

    const requestBody = {
      ...formValue,
      chapter: {
        chId: formValue.chapterId
      }
    };
    delete requestBody.chapterId;

    this.http.post('http://localhost:8080/auth/signup', requestBody).subscribe({
      next: res => {
        alert('User registered! 🎉');
        this.router.navigate(['/login']); // Redirect to login page
      },
      error: err => alert('Error: ' + err.message)
    });

  }

}
