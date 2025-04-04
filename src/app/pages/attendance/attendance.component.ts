import { Component } from '@angular/core';
import { AttendanceFilterComponent } from '../../component/attendance-filter/attendance-filter.component';
import { AttendanceTableComponent } from '../../component/attendance-table/attendance-table.component';

@Component({
  selector: 'app-attendance',
  imports: [AttendanceFilterComponent, AttendanceTableComponent],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {

  selectedFilter: string = '7'; // Default: Last 7 days

  updateFilter(filterValue: string) {
    this.selectedFilter = filterValue;
    console.log('Selected Filter:', this.selectedFilter);
    // Fetch or update attendance records based on this filter
  }

}
