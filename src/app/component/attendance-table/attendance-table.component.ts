import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance-table',
  imports: [NgClass, NgFor],
  templateUrl: './attendance-table.component.html',
  styleUrl: './attendance-table.component.css'
})
export class AttendanceTableComponent {

  attendanceRecords = [
    { date: 'Jan 15, 2025', checkIn: '09:02 AM', checkOut: '06:05 PM', duration: '9h 3m', status: 'Present' },
    { date: 'Jan 14, 2025', checkIn: '09:15 AM', checkOut: '05:45 PM', duration: '8h 30m', status: 'Late' },
    { date: 'Jan 13, 2025', checkIn: '08:55 AM', checkOut: '06:00 PM', duration: '9h 5m', status: 'Present' }
  ];

  getStatusClass(status: string) {
    return {
      'text-green-500 bg-green-100 px-2 py-1 p-1 rounded-lg': status === 'Present',
      'text-yellow-500 bg-yellow-100 px-2 py-1 rounded-lg': status === 'Late'
    };
  }

}
