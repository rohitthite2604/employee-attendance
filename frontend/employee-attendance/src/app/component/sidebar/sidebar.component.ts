// sidebar.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
selector: 'app-sidebar',
imports :[CommonModule,RouterLink,  RouterModule],
templateUrl: './sidebar.component.html',
styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    isCollapsed = false;
    sidebarItems: any[] = [];
    currentUrl: string = '';

    constructor(private authService: AuthService, private router: Router) {}

ngOnInit(): void {
    const role = this.authService.getUserRole();

    const allItems = [
      {
        name: 'Dashboard',
        icon: 'fas fa-home',
        link: '/dashboard',
        roles: ['MANAGER', 'EMPLOYEE','HR']
      },
      {
        name: 'Attendance History',
        icon: 'fas fa-clipboard-list',
        link: '/attendance',
        roles: ['EMPLOYEE','HR','MANAGER']
      },
      {
        name: 'Apply for Leave',
        icon: 'fas fa-paper-plane',
        link: '/leave',
        roles: ['EMPLOYEE']
      },
      {
        name: 'Leave Status',
        icon: 'fas fa-clipboard-check',
        link: '/leave-status',
        roles: ['EMPLOYEE']
      },
      {
        name: 'View Policies',
        icon: 'fas fa-scroll',
        link: '/policy',
        roles: ['EMPLOYEE']
      },
      {
        name: 'Leave Requests',
        icon: 'fas fa-file-alt',
        link: '/leave-requests',
        roles: ['MANAGER']
      },
      {
        name: 'Attendance Records',
        icon: 'fas fa-users',
        link: '/attendance-records',
        roles: ['MANAGER','HR']
      },
      {
        name: 'Leave Types',
        icon: 'fas fa-list-ul',
        link: '/leave-types',
        roles: ['HR']
      },
      {
        name: 'Policy Documents',
        icon: 'fas fa-file-contract',
        link: '/policy-documents',
        roles: ['HR']
      }
    ];

    this.sidebarItems = allItems.filter(item => role && item.roles.includes(role));

    this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = event.urlAfterRedirects;
        }
      });
  }
}




