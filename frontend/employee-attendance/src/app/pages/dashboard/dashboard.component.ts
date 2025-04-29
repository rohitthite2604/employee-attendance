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

  presentCount = 0;
  absentCount = 0;
  leaveCount = 0;

  onStatsUpdated(stats: { present: number; absent: number; leave: number }) {
    this.presentCount = stats.present;
    this.absentCount = stats.absent;
    this.leaveCount = stats.leave;
  }

}
