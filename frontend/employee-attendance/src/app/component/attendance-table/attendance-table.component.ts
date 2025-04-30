import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AttendanceRecord, AttendanceService } from '../../service/attendance.service';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';
import { formatDate, formatDuration, formatTime } from '../../utils/formatting.utils';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-attendance-table',
  imports: [NgClass, NgFor, MatPaginatorModule],
  templateUrl: './attendance-table.component.html',
  styleUrl: './attendance-table.component.css'
})
export class AttendanceTableComponent implements OnInit {

  @Output() statsUpdated = new EventEmitter<{ present: number, absent: number, leave: number }>();

  attendanceRecords: AttendanceRecord[] = [];
  userId: number = 0;
  private attendanceSubscription: Subscription | null = null;
  pageSize = 5;
  pageIndex = 0;
  paginatedRecords: AttendanceRecord[] = [];

  constructor(private attendanceService: AttendanceService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId === null || isNaN(userId)) {
      console.error('User ID not found or invalid!');
      return;
    }
    this.userId = userId;

    // Load attendance records for the user
    this.loadAttendance();

    this.attendanceSubscription = this.attendanceService.attendanceUpdated$.subscribe(() => {
      this.loadAttendance(); // Reload attendance records when notified
    });
  }


  loadAttendance(): void {
    this.attendanceService.getUserAttendance(this.userId).subscribe(
      (records) => {
        const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

      const hasToday = records.some(r => r.date === today);

      // If no record for today, push a default ABSENT record
      if (!hasToday) {
        records.push({
          date: today,
          status: 'ABSENT'
        } as AttendanceRecord);
      }


      let present = 0;
      let absent = 0;
      let leave = 0;

      for(const record of records) {
        if (record.status === 'PRESENT') {
          present++;
        } else if (record.status === 'ABSENT') {
          absent++;
        } else if (record.status === 'ON_LEAVE') {
          leave++;
        }
      }
      this.statsUpdated.emit({ present, absent, leave });

        this.attendanceRecords = records
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map(record => ({
          ...record,
          date: formatDate(record.date),
          checkIn: record.checkIn ? formatTime(record.checkIn) : '--',
          checkOut: record.checkOut ? formatTime(record.checkOut) : '--',
          duration: record.duration ? formatDuration(record.duration) : '--'
        }));

      this.updatePaginatedRecords();
      },
      (error) => {
        console.error('Failed to load attendance records', error);
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.attendanceSubscription) {
      this.attendanceSubscription.unsubscribe();
    }
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'on_leave':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-800';

    }

  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedRecords();
  }
  
  updatePaginatedRecords(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedRecords = this.attendanceRecords.slice(start, end);
  }

}
