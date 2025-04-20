import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AttendanceRecord, AttendanceService } from '../../service/attendance.service';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-attendance-table',
  imports: [NgClass, NgFor],
  templateUrl: './attendance-table.component.html',
  styleUrl: './attendance-table.component.css'
})
export class AttendanceTableComponent implements OnInit {

  attendanceRecords: AttendanceRecord[] = [];
  userId: number = 0;
  private attendanceSubscription: Subscription | null = null;

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
        this.attendanceRecords = [...records]; // Use a new array reference to trigger change detection
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
      default:
        return 'bg-gray-100 text-gray-800';

    }

  }

}
