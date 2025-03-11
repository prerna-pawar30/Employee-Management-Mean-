import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-check-in-out',
  imports:[CommonModule,FormsModule],
  templateUrl: './check-in-out.component.html',
  styleUrls: ['./check-in-out.component.css']
})
export class CheckInOutComponent implements OnInit {
  employeeId = 'EMPLOYEE_ID_HERE';  // Replace with actual employee ID
  isCheckedIn = false;
  timer: any;
  elapsedTime = 0;
  history: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.employeeId = localStorage.getItem('employeeId') || '';
    // if (this.employeeId) {
    //   this.getHistory();
    // }
  }

  checkIn() {
    this.http.post('http://localhost:3000/checkinout/check-in', { employeeId: this.employeeId }).subscribe(() => {
      this.isCheckedIn = true;
      this.elapsedTime = 0;
      this.startTimer();
    });
  }
  
  checkOut() {
    this.http.post('http://localhost:3000/checkinout/check-out', { employeeId: this.employeeId }).subscribe(() => {
      this.isCheckedIn = false;
      this.stopTimer();
      this.getHistory();
    });
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.elapsedTime += 1;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  getHistory() {
    this.http.get<any[]>(`http://localhost:3000/checkinout/history/${this.employeeId}`).subscribe(data => {
      this.history = data;
    });
  }
  
  downloadHistory() {
    window.open(`http://localhost:3000/checkinout/download/${this.employeeId}`, '_blank');
  }
}
