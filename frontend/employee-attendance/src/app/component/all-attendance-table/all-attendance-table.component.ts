import { Component, Input } from '@angular/core';
import { AttendanceResponse, AttendanceService } from '../../service/attendance.service';
import { formatDate, formatDuration, formatTime } from '../../utils/formatting.utils';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-all-attendance-table',
  imports: [NgFor, NgClass],
  templateUrl: './all-attendance-table.component.html',
  styleUrl: './all-attendance-table.component.css'
})
export class AllAttendanceTableComponent {
  @Input() records: any[] = [];


  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';

    }

  }

  trackById(index: number, record: any): any {
    return record.id || index;
  }

}
