import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SideBarComponent } from "../side-bar/side-bar.component";

interface LeaveType {
  type: string;
  available: number;
  booked: number;
}

@Component({
  selector: 'app-leave-employee',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, SideBarComponent],
})
export class EmployeeleaveComponent implements OnInit {
  newLeaveRequest = {
    employeeId: '',
    reason: '',
    fromDate: '',
    toDate: '',
    status: 'pending',
    leaveType: '',
  };

  leaveTypes: LeaveType[] = [
    { type: 'Annual Leave', available: 20, booked: 5 },
    { type: 'Casual Leave', available: 12, booked: 2 },
    { type: 'Sick Leave', available: 12, booked: 0 },
    { type: 'Maternity Leave', available: 182, booked: 0 },
    { type: 'Optional Holiday', available: 3, booked: 0 }
  ];

  leaveRequests: any[] = [];
  apiUrl = 'http://localhost:3000/api/leave';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadEmployeeId();
    this.loadEmployeeLeaveRequests();
  }

  loadEmployeeId() {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user && user._id) {
      this.newLeaveRequest.employeeId = user._id;
    } else {
      this.snackBar.open('User not found. Please log in again.', 'Close', { duration: 3000 });
    }
  }

  submitLeaveRequest() {
    if (!this.newLeaveRequest.reason || !this.newLeaveRequest.fromDate || !this.newLeaveRequest.toDate || !this.newLeaveRequest.leaveType) {
      this.snackBar.open('Please fill all fields before submitting.', 'Close', { duration: 3000 });
      return;
    }

    // Basic check for date validity
    if (new Date(this.newLeaveRequest.fromDate) > new Date(this.newLeaveRequest.toDate)) {
      this.snackBar.open('From date cannot be after to date.', 'Close', { duration: 3000 });
      return;
    }

    this.http.post(this.apiUrl, this.newLeaveRequest).subscribe(
      () => {
        this.snackBar.open('Leave request submitted successfully!', 'Close', { duration: 3000 });
        this.resetForm();
        this.loadEmployeeLeaveRequests();
        this.updateAvailableLeave(this.newLeaveRequest.leaveType); // Update available leave
      },
      (error) => {
        console.error('Error submitting leave request:', error);
        this.snackBar.open('Failed to submit leave request.', 'Close', { duration: 3000 });
      }
    );
  }

  loadEmployeeLeaveRequests() {
    if (this.newLeaveRequest.employeeId) {
      this.http.get<any[]>(`${this.apiUrl}/employee/${this.newLeaveRequest.employeeId}`).subscribe(
        (data) => {
          this.leaveRequests = data;
        },
        (error) => {
          console.error('Error fetching leave requests:', error);
          this.snackBar.open('Error fetching leave history.', 'Close', { duration: 3000 });
        }
      );
    }
  }

  resetForm() {
    this.newLeaveRequest = {
      employeeId: this.newLeaveRequest.employeeId,
      reason: '',
      fromDate: '',
      toDate: '',
      status: 'pending',
      leaveType: '',
    };
  }

  updateAvailableLeave(leaveTypeName: string) {
    const selectedLeaveType = this.leaveTypes.find(leave => leave.type === leaveTypeName);
    if (selectedLeaveType) {
      const fromDate = new Date(this.newLeaveRequest.fromDate);
      const toDate = new Date(this.newLeaveRequest.toDate);
      const leaveDays = Math.round(Math.abs((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24))) + 1;
      selectedLeaveType.booked += leaveDays;
      // You might want to persist these changes on the server as well, depending on your requirements.
    }
  }
}