import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../service/attendance.service';
import { AuthService } from '../../service/auth.service';
import { formatDate, formatDuration, formatTime } from '../../utils/formatting.utils';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-emp-dashboard-cards',
  imports: [NgIf],
  templateUrl: './emp-dashboard-cards.component.html',
  styleUrl: './emp-dashboard-cards.component.css'
})
export class EmpDashboardCardsComponent implements OnInit {

  isCheckedIn = false;
  userId = 0;
  todayStatus: string = 'Absent'; // Default status
  workingHours: string = '0h 0m';

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

    this.fetchTodayAttendance();


    // Fetch today's attendance status to set the initial state of isCheckedIn
    
  }

  fetchTodayAttendance(): void {

    this.attendanceService.getUserAttendance(this.userId).subscribe(
      (records) => {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const todayRecord = records.find(record => record.date === today);
        if (todayRecord) {
          const formattedDate = formatDate(todayRecord.date);
          const formattedCheckIn = formatTime(todayRecord.checkIn);
          const formattedCheckOut = todayRecord.checkOut ? formatTime(todayRecord.checkOut) : '-';
          const formattedDuration = todayRecord.duration ? formatDuration(todayRecord.duration) : '0h 0m';

          // Update component properties
          this.todayStatus = todayRecord.status || 'ABSENT';
          this.workingHours = formattedDuration;
          this.isCheckedIn = !!todayRecord.checkIn && !todayRecord.checkOut;

          console.log(`Today's Record: Date=${formattedDate}, CheckIn=${formattedCheckIn}, CheckOut=${formattedCheckOut}, Duration=${formattedDuration}`);
        } else {
          this.todayStatus = 'ABSENT';
          this.workingHours = '0h 0m';
          this.isCheckedIn = false;
        }
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
          this.fetchTodayAttendance();
          this.attendanceService.notifyAttendanceUpdated();// Add delay to ensure backend updates
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
          this.fetchTodayAttendance();
          this.attendanceService.notifyAttendanceUpdated();
        },
        (error) => {
          console.error('Check-out failed', error);
        }
      );
    }
    
  }

}
