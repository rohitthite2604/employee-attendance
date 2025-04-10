import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
 
  constructor(private router: Router) {}
 
  onSubmit() {
    // Here you would normally validate credentials with an auth service
    // For now, we'll just redirect on any submission
    console.log(this.email);
    console.log(this.password);
    if (this.email && this.password) {
      
      // Mock successful login
      localStorage.setItem('isLoggedIn', 'true');
      // Redirect to dashboard which will include the sidebar
      this.router.navigate(['/dashboard']);
    } else {
      // You could add validation error handling here
      console.error('Username and password are required');
    }
  }
}
