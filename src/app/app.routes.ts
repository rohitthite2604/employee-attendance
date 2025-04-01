import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';

export const routes: Routes = [
    {path:'',
        component: MainLayoutComponent,
        children:[
            {path:'', component: DashboardComponent},
            {path:'dashboard',component:DashboardComponent},
            {path:'attendance',component:AttendanceComponent}
        ]
    }

];
