import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  role: string | null = null;
  phoneNumber: string = '';
  email: string = '';
  chapterName: string | null = '';
  designationName: string | null = '';
  toggleProfile: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Fetch the logged-in user's name from AuthService
    this.userName = this.authService.getUserName() || 'Guest';
    this.role = this.authService.getUserRole();
    this.phoneNumber = this.authService.getPhoneNumber() || 'N/A';
    this.email = this.authService.getEmail() || 'N/A';
    this.chapterName = this.authService.getChapterName();
    this.designationName = this.authService.getDesignationName();
  }

  toggleProfilePopup(): void {
    this.toggleProfile = !this.toggleProfile;
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn from localStorage
    this.router.navigate(['/login']); // Redirect to login page
  }
}
