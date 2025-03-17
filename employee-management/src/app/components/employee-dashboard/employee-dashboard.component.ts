import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CheckInOutService } from '../../services/check-in-out.service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.prod';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


interface WorkRecord {
  date: string;
  checkInTime: Date;
  checkOutTime: Date | null;
  duration: number;
}

@Component({
  selector: 'app-employee-dashboard',
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  isCheckedIn: boolean = false;
  lastCheckIn: Date | null = null;
  lastCheckOut: Date | null = null;
  elapsedTime: number = 0;
  timer: any;
  employeeId: string | null = null;
  workRecords: WorkRecord[] = [];
  showTotalHoursView: boolean = false;
  totalWorkingHours: number = 0;
  selectedMonth: string = '';
  months: string[] = [];
  filteredWorkRecords: WorkRecord[] = [];

  constructor(
    @Inject(AuthService) public authService: AuthService,
    private checkInOutService: CheckInOutService,
    private http: HttpClient
  ) {
    const today = new Date();
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthYearStr = monthDate.toLocaleString('default', { month: 'long', year: 'numeric' });
      this.months.push(monthYearStr);
    }
    this.selectedMonth = this.months[0]; // Set default to current month
  }

  ngOnInit() {
    this.employeeId = this.authService.userId;
    if (!this.employeeId) {
      console.error("Employee ID is missing!");
      return;
    }
    this.fetchWorkRecords();
  }

  startStopwatch() {
    if (!this.isCheckedIn) {
      this.checkIn();
    }
    this.timer = setInterval(() => {
      this.elapsedTime += 1000;
    }, 1000);
  }

  stopStopwatch() {
    clearInterval(this.timer);
    if (this.isCheckedIn) {
      this.checkOut();
    }
  }

  checkIn() {
    if (!this.employeeId) return;

    this.checkInOutService.checkIn(this.employeeId).subscribe(
      (res: any) => {
        this.isCheckedIn = true;
        this.lastCheckIn = new Date();
        this.elapsedTime = 0;
        this.fetchWorkRecords(); // Refresh work records after check-in
      },
      (error) => console.error(error)
    );
  }

  checkOut() {
    if (!this.employeeId) return;

    this.checkInOutService.checkOut(this.employeeId).subscribe(
      (res: any) => {
        this.isCheckedIn = false;
        this.lastCheckOut = new Date();
        this.fetchWorkRecords(); // Refresh work records after check-out
      },
      (error) => console.error(error)
    );
  }

  fetchWorkRecords() {
    if (!this.employeeId) return;

    this.http.get(`${environment.apiUrl}/api/check-in-out/history/${this.employeeId}`).subscribe(
      (res: any) => {
        console.log("History API Response:", res); // Debugging
        if (res.history) {
          this.workRecords = res.history.map((record: any) => ({
            date: new Date(record.checkInTime).toISOString().split('T')[0],
            checkInTime: new Date(record.checkInTime),
            checkOutTime: record.checkOutTime ? new Date(record.checkOutTime) : null,
            duration: record.checkOutTime
              ? new Date(record.checkOutTime).getTime() - new Date(record.checkInTime).getTime()
              : 0
          }));
          this.filterWorkRecordsByMonth();
        } else {
          this.workRecords = [];
          this.filteredWorkRecords = [];
          this.totalWorkingHours = 0;
        }
      },
      (error) => console.error("Error fetching history:", error)
    );
  }

  formatTime(milliseconds: number): string {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  viewTotalHours() {
    this.showTotalHoursView = true;
    this.calculateTotalWorkingHours();
  }

  hideTotalHours() {
    this.showTotalHoursView = false;
  }

  calculateTotalWorkingHours() {
    this.totalWorkingHours = this.filteredWorkRecords.reduce((total, record) => {
      return total + record.duration;
    }, 0);
  }

  onMonthChange(newMonth: string) {
    this.selectedMonth = newMonth;
    this.filterWorkRecordsByMonth();
  }

  filterWorkRecordsByMonth() {
    const [monthStr, yearStr] = this.selectedMonth.split(' ');
    const month = new Date(Date.parse(monthStr + " 1, " + yearStr)).getMonth();
    const year = parseInt(yearStr, 10);

    this.filteredWorkRecords = this.workRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getMonth() === month && recordDate.getFullYear() === year;
    });
    this.calculateTotalWorkingHours();
  }

  downloadMonthlyRecord() {
    if (!this.filteredWorkRecords.length) {
      alert('No records found for the selected month.');
      return;
    }
  
    const csvRows = [];
    csvRows.push(['Date', 'Check-In Time', 'Check-Out Time', 'Duration (HH:MM:SS)']);
  
    this.filteredWorkRecords.forEach(record => {
      const formattedDate = record.date;
      const formattedCheckInTime = new Date(record.checkInTime).toLocaleTimeString();
      const formattedCheckOutTime = record.checkOutTime ? new Date(record.checkOutTime).toLocaleTimeString() : 'Pending';
      const formattedDuration = record.checkOutTime ? this.formatTime(record.duration) : 'In Progress';
      csvRows.push([formattedDate, formattedCheckInTime, formattedCheckOutTime, formattedDuration]);
    });
  
    const csvString = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const fileName = `work_record_${this.selectedMonth.replace(' ', '_')}.csv`;
  
    saveAs(blob, fileName);
  }
  
}