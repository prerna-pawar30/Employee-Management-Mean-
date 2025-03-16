import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckInOutService } from '../../services/check-in-out.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-check-in-out',
  imports:[CommonModule, FormsModule],
  templateUrl: './check-in-out.component.html',
  styleUrls: ['./check-in-out.component.css']
})
export class CheckInOutComponent{

   isCheckedIn: boolean = false;
    lastCheckIn: Date | null = null;
    lastCheckOut: Date | null = null;
    elapsedTime: number = 0;
    timer: any;
    employeeId: string | null = null;
    workRecords: any[] = [];
  
    constructor(
      @Inject(AuthService) public authService: AuthService,
      private checkInOutService: CheckInOutService,
      private http: HttpClient
    ) {}
  
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
          } else {
            this.workRecords = [];
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
 
}
