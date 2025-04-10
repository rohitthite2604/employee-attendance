import { Router, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { LeaveComponent } from './pages/leave/leave.component';
import { inject } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';


// Auth guard function (modern approach with functional guards)
export const authGuard = () => {
    const router = inject(Router);
    
    if (localStorage.getItem('isLoggedIn') === 'true') {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  };
export const routes: Routes = [
    {path: 'login', component: LoginComponent },
    // Protected routes (auth required)
       { path:'',
        component: MainLayoutComponent,
        canActivate: [() => authGuard()],
        children:[
            {path:'', component: DashboardComponent, data: { title: 'Dashboard' }},
            {path:'dashboard',component:DashboardComponent, data: { title: 'Dashboard' }},
            {path:'attendance',component:AttendanceComponent, data: { title: 'Attendance' }},
            {path:'leave',component:LeaveComponent, data: { title: 'Leave' }}
        ]
    },

    // Redirect any unknown paths to login
  { path: '**', redirectTo: '/login' }

];
