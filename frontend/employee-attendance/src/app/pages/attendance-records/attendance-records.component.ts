import { Component, OnInit } from '@angular/core';
import { AllAttendanceTableComponent } from '../../component/all-attendance-table/all-attendance-table.component';
import { AttendanceResponse, AttendanceService } from '../../service/attendance.service';
import { AttendanceFilterComponent } from '../../component/attendance-filter/attendance-filter.component';
import { formatDate, formatDuration, formatTime } from '../../utils/formatting.utils';

@Component({
  selector: 'app-attendance-records',
  imports: [AllAttendanceTableComponent, AttendanceFilterComponent],
  templateUrl: './attendance-records.component.html',
  styleUrl: './attendance-records.component.css'
})


export class AttendanceRecordsComponent implements OnInit {
  attendanceRecords: AttendanceResponse[] = [];
  filteredRecords: AttendanceResponse[] = [];
  searchText: string = '';

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {
    this.attendanceService.getAllAttendance().subscribe(data => {
      this.attendanceRecords = data;
      this.filteredRecords = data; // Initialize with all records
      this.applyFilters();
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
    this.applyFilters();
  }

  onSearchChange(searchTerm: string): void {
    this.searchText = searchTerm.toLowerCase();
    this.applyFilters();
  }

  private applyFilters(): void {
    const search = this.searchText.toLowerCase();
    this.filteredRecords = this.attendanceRecords
      .filter(record => record.user.userName.toLowerCase().includes(search))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(record => ({
        ...record,
        date: formatDate(record.date),
        checkIn: record.checkIn ? formatTime(record.checkIn) : '--',
        checkOut: record.checkOut ? formatTime(record.checkOut) : '--',
        duration: record.duration ? formatDuration(record.duration) : '--'
      }))
      
  }

}
