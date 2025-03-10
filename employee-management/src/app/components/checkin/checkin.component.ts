import { Component } from '@angular/core';
import { AttendanceService } from '../../services/attendance.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkin',
  imports: [FormsModule],
  templateUrl: './checkin.component.html',
  styleUrl: './checkin.component.css'
})
export class CheckinComponent {

  employeeId: string = '';
  qrCode: string | null = null;

  constructor(private attendanceService: AttendanceService) {}

  checkIn() {
   
  }

  checkOut() {
   
  }

}
