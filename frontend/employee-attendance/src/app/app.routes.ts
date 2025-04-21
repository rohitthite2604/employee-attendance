import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { LeaveComponent } from './pages/leave/leave.component';
import { inject, Injectable } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthService } from './service/auth.service';
import { LeaveRequestsComponent } from './pages/leave-requests/leave-requests.component';
import { AttendanceRecordsComponent } from './pages/attendance-records/attendance-records.component';
import { PolicyDocumentsComponent } from './pages/policy-documents/policy-documents.component';
import { LeaveTypesComponent } from './pages/leave-types/leave-types.component';
import { PolicyComponent } from './pages/policy/policy.component';
import { LeaveStatusPageComponent } from './pages/leave-status-page/leave-status-page.component';

@Injectable({
  providedIn: 'root', // Ensures it's available application-wide
})

export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as Array<string>;
    const userRole = this.authService.getUserRole();

    if (userRole && expectedRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}


// Auth guard function (modern approach with functional guards)
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
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
        canActivate: [authGuard],
        children: [
          {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [RoleGuard],
            data: { roles: ['HR', 'EMPLOYEE','MANAGER'] }
          },
          {
            path: 'attendance',
            component: AttendanceComponent,
            canActivate: [RoleGuard],
            data: { roles: ['EMPLOYEE','HR','MANAGER'] }
          },
          {
            path: 'leave',
            component: LeaveComponent,
            canActivate: [RoleGuard],
            data: { roles: ['EMPLOYEE'] }
          },
          {
            path: 'leave-status',
            component: LeaveStatusPageComponent,
            canActivate: [RoleGuard],
            data: { roles: ['EMPLOYEE'] }
          },
          {
            path: 'policy',
            component: PolicyComponent,
            canActivate: [RoleGuard],
            data: { roles: ['EMPLOYEE'] }
          },
          {
            path: 'leave-requests',
            component: LeaveRequestsComponent,
            canActivate: [RoleGuard],
            data: { roles: ['MANAGER'] }
          },
          {
            path: 'attendance-records',
            component: AttendanceRecordsComponent,
            canActivate: [RoleGuard],
            data: { roles: ['MANAGER','HR'] }
          },
          {
            path: 'policy-documents',
            component: PolicyDocumentsComponent,
            canActivate: [RoleGuard],
            data: { roles: ['HR'] }
          },
          {
            path: 'leave-types',
            component: LeaveTypesComponent,
            canActivate: [RoleGuard],
            data: { roles: ['HR'] }
          }
        ]
      },

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    // Redirect any unknown paths to login
  { path: '**', redirectTo: '/login' }

];
