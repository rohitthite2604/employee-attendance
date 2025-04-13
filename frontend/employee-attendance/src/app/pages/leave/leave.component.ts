import { Component } from '@angular/core';
import { ApplyForLeaveComponent } from '../../component/apply-for-leave/apply-for-leave.component';
import { LeaveStatusComponent } from '../../component/leave-status/leave-status.component';

@Component({
  selector: 'app-leave',
  imports: [ApplyForLeaveComponent, LeaveStatusComponent],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.css'
})
export class LeaveComponent {

}
