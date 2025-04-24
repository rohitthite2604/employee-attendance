import { Component, Input } from '@angular/core';
import { AttendanceResponse, AttendanceService } from '../../service/attendance.service';
import { formatDate, formatDuration, formatTime } from '../../utils/formatting.utils';
import { NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-attendance-table',
  imports: [NgFor, NgClass, FormsModule],
  templateUrl: './all-attendance-table.component.html',
  styleUrl: './all-attendance-table.component.css'
})
export class AllAttendanceTableComponent {
  @Input() records: any[] = [];
  filteredRecords: AttendanceResponse[] = [];
  searchText: string = '';
  attendanceRecords: AttendanceResponse[] = [];

  constructor(private attendanceService: AttendanceService) { }
  ngOnInit() {
    this.attendanceService.getAllAttendance().subscribe(data => {
      this.attendanceRecords = data
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(record => ({
        ...record,
        date: formatDate(record.date),
        checkIn: record.checkIn ? formatTime(record.checkIn) : '--',
        checkOut: record.checkOut ? formatTime(record.checkOut) : '--',
        duration: record.duration ? formatDuration(record.duration) : '--'
      }));
      this.filteredRecords = this.attendanceRecords;

    });
  }

  onSearchChange() {
    const search = this.searchText.toLowerCase();
    this.filteredRecords = this.attendanceRecords.filter(record =>
      record.user.userName.toLowerCase().includes(search)
    );
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';

    }

  }

}
