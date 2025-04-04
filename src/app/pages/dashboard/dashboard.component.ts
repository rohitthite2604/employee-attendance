import { Component } from '@angular/core';
import { EmpDashboardCardsComponent } from '../../component/emp-dashboard-cards/emp-dashboard-cards.component';
import { AttendanceOverviewComponent } from '../../component/attendance-overview/attendance-overview.component';
import { AttendanceTableComponent } from '../../component/attendance-table/attendance-table.component';

@Component({
  selector: 'app-dashboard',
  imports: [EmpDashboardCardsComponent, AttendanceOverviewComponent, AttendanceTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
