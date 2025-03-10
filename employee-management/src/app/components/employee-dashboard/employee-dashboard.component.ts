import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-dashboard',
  imports: [DatePipe],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {
  isCheckedIn: boolean = false;
  lastCheckIn: Date | null = null;
  lastCheckOut: Date | null = null;

  constructor(@Inject(AuthService) public authService: AuthService) {}

  checkIn() {
    this.isCheckedIn = true;
    this.lastCheckIn = new Date();
    console.log('Checked In at:', this.lastCheckIn);
  }

  checkOut() {
    this.isCheckedIn = false;
    this.lastCheckOut = new Date();
    console.log('Checked Out at:', this.lastCheckOut);
  }
}

