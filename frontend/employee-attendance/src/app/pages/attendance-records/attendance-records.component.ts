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
  selectedDays: string = 'all';

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {
    this.attendanceService.getAllAttendance().subscribe(data => {
      this.attendanceRecords = data;
      this.filteredRecords = data; // Initialize with all records
      this.applyFilters();
    });
  }

  onFilterChange(days: string): void {
    this.selectedDays = days;
    this.applyFilters();
  }

  onSearchChange(searchText: string): void {
    this.searchText = searchText;
    this.applyFilters();
  }

  applyFilters(): void {
    const now = new Date();

    this.filteredRecords = this.attendanceRecords
      .filter(record => {
        const matchesSearch = record.user.userName.toLowerCase().includes(this.searchText.toLowerCase());

        let withinDays = true;
        if (this.selectedDays !== 'all') {
          const days = parseInt(this.selectedDays, 10);
          const recordDate = new Date(record.date);
          const diffTime = now.getTime() - recordDate.getTime();
          const diffDays = diffTime / (1000 * 60 * 60 * 24); // Convert ms to days
          withinDays = diffDays <= days;
        }

        return matchesSearch && withinDays;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending
      .map(record => ({
        ...record,
        date: formatDate(record.date), // Format the date
        checkIn: record.checkIn ? formatTime(record.checkIn) : '--', // Format check-in time
        checkOut: record.checkOut ? formatTime(record.checkOut) : '--', // Format check-out time
        duration: record.duration ? formatDuration(record.duration) : '--' // Format duration
      }));
  }

}
