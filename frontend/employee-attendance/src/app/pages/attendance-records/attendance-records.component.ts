import { Component } from '@angular/core';
import { AllAttendanceTableComponent } from '../../component/all-attendance-table/all-attendance-table.component';
import { AttendanceResponse, AttendanceService } from '../../service/attendance.service';
import { AttendanceFilterComponent } from '../../component/attendance-filter/attendance-filter.component';

@Component({
  selector: 'app-attendance-records',
  imports: [AllAttendanceTableComponent, AttendanceFilterComponent],
  templateUrl: './attendance-records.component.html',
  styleUrl: './attendance-records.component.css'
})


export class AttendanceRecordsComponent {
  attendanceRecords: AttendanceResponse[] = [];
  filteredRecords: AttendanceResponse[] = [];

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {
    this.attendanceService.getAllAttendance().subscribe(data => {
      this.attendanceRecords = data;
      this.filteredRecords = data; // Initialize with all records
    });
  }

  onFilterChange(filterValue: string): void {
    const days = parseInt(filterValue, 10);
    if (isNaN(days)) {
      this.filteredRecords = this.attendanceRecords; // Show all records
    } else {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      this.filteredRecords = this.attendanceRecords.filter(record =>
        new Date(record.date) >= cutoffDate
      );
    }
  }

}
