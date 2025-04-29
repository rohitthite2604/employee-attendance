import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-attendance-overview',
  imports: [],
  templateUrl: './attendance-overview.component.html',
  styleUrl: './attendance-overview.component.css'
})
export class AttendanceOverviewComponent {

  @Input() presentCount = 0;
@Input() absentCount = 0;
@Input() leaveCount = 0;


}
