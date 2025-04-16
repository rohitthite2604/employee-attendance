import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn: boolean = true;

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn from localStorage
    this.isLoggedIn = false; // Update local state
    this.router.navigate(['/login']); // Redirect to login page
  }
}
