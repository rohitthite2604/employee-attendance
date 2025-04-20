import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  isLoggedIn: boolean = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Fetch the logged-in user's name from AuthService
    this.userName = this.authService.getUserName() || 'Guest';
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn from localStorage
    this.isLoggedIn = false; // Update local state
    this.router.navigate(['/login']); // Redirect to login page
  }
}
