import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { formatDate, formatDuration, formatTime } from '../../utils/formatting.utils';

@Component({
  selector: 'app-attendance-filter',
  imports: [],
  templateUrl: './attendance-filter.component.html',
  styleUrl: './attendance-filter.component.css'
})
export class AttendanceFilterComponent {

  @Input() records: any[] = [];
  @Output() filterChanged = new EventEmitter<string>(); // Emits the selected value

  onFilterChange(event: Event) {
    const filterValue = (event.target as HTMLSelectElement).value;
    this.filterChanged.emit(filterValue); // Sends the selected filter value
  }

  exportToExcel(records: any[]) {
    if (!records || records.length === 0) {
      console.error('No records available to export.');
      return;
    }
    const flattenedRecords = records
    .sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(record => ({
      Username: record.user.userName,
      Date: formatDate(record.date),
      'Check In': record.checkIn ? formatTime(record.checkIn) : "--",
      'Check Out': record.checkOut ? formatTime(record.checkOut) : "--",
      Duration: record.duration ? formatDuration(record.duration) : "--",
      Status: record.status
    }));
    const worksheet = XLSX.utils.json_to_sheet(flattenedRecords);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Records');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Attendance_Records');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, `${fileName}.xlsx`);
  }

  // exportToPDF(records: any[]): void {
  //   if (!records || records.length === 0) {
  //     console.error('No records available to export.');
  //     return;
  //   }
  
  //   const doc = new jsPDF();
  //   doc.text('Attendance Records', 14, 10); // Add title
  
  //   let yPosition = 20; // Start position for the text
  //   records.forEach((record, index) => {
  //     const recordText = `
  //     ${index + 1}. Username: ${record.user.userName}
  //        Date: ${record.date}
  //        Check In: ${record.checkIn}
  //        Check Out: ${record.checkOut}
  //        Duration: ${record.duration}
  //        Status: ${record.status}
  //     `;
  //     doc.text(recordText, 14, yPosition);
  //     yPosition += 30; // Adjust the vertical spacing for each record
  //   });
  
  //   doc.save('Attendance_Records.pdf');
  // }

}
