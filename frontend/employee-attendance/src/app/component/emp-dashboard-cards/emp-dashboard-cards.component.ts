import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../service/attendance.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-emp-dashboard-cards',
  imports: [],
  templateUrl: './emp-dashboard-cards.component.html',
  styleUrl: './emp-dashboard-cards.component.css'
})
export class EmpDashboardCardsComponent implements OnInit {

  isCheckedIn = false;
  userId = 0;

  constructor(private attendanceService: AttendanceService, private authService: AuthService) {}

  currentTime: string = new Date().toLocaleTimeString();

  ngOnInit(): void {
    // Fetch the user ID dynamically
    const userId = this.authService.getUserId();
    if (userId === null) {
      console.error('User ID not found!');
      return;
    }
    this.userId = userId;

    if (!this.userId) {
      console.error('User ID not found!');
      return;
    }

    // Fetch today's attendance status to set the initial state of isCheckedIn
    this.attendanceService.getUserAttendance(this.userId).subscribe(
      (records) => {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const todayRecord = records.find(record => record.date === today);
        this.isCheckedIn = todayRecord ? !!todayRecord.checkIn && !todayRecord.checkOut : false;
      },
      (error) => {
        console.error('Failed to fetch attendance records', error);
      }
    );
  }

  toggleCheckInOut(): void {
    if (!this.isCheckedIn) {
      this.attendanceService.checkIn(this.userId).subscribe(
        (response) => {
          console.log(response.message);
          this.isCheckedIn = true;
          this.attendanceService.notifyAttendanceUpdated();
        },  
        (error) => {
          console.error('Check-in failed', error);
        }
      );
    } else {
      this.attendanceService.checkOut(this.userId).subscribe(
        (response) => {
          console.log(response.message);
          this.isCheckedIn = false;
          this.attendanceService.notifyAttendanceUpdated();
        },
        (error) => {
          console.error('Check-out failed', error);
        }
      );
    }
  }

}
