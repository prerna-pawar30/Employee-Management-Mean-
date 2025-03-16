import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class EmployeeleaveComponent implements OnInit {
  isCheckedIn: boolean = false;
  newLeaveRequest = { employeeId: '', reason: '', date: '' };

  constructor(private http: HttpClient, @Inject(LeaveService) private leaveService : LeaveService) {}

  ngOnInit() {
   
    this.loadEmployeeId();  // Load Employee ID when the component initializes
  }


  loadEmployeeId() {
    const user = JSON.parse(localStorage.getItem('user')!); // Get logged-in user
    if (user && user._id) {
      this.newLeaveRequest.employeeId = user._id; // Set employee ID
    } else {
      Swal.fire('Error', 'User not found. Please log in again.', 'error');
    }
  }



  submitLeaveRequest() {
    console.log('Before Submit - Leave Data:', this.newLeaveRequest); // Debug log ✅

    if (!this.newLeaveRequest.employeeId) {
      Swal.fire('Error', 'Employee ID is missing. Please log in again.', 'error');
      return;
    }

    if (!this.newLeaveRequest.reason || !this.newLeaveRequest.date) {
      Swal.fire('Error', 'Please enter a leave reason and date.', 'error');
      return;
    }

    const leaveData = {
      employeeId: this.newLeaveRequest.employeeId,  // Ensure employee ID is included
      reason: this.newLeaveRequest.reason,
      date: this.newLeaveRequest.date,
      status: 'Pending' // Default status
    };

    this.leaveService.submitLeave(leaveData).subscribe({
      next: (response) => {
        console.log('Leave request submitted successfully:', response);
        Swal.fire('Success', 'Leave request submitted.', 'success');
        this.newLeaveRequest = { employeeId: this.newLeaveRequest.employeeId, reason: '', date: '' }; // Reset form, keep ID
      },
      error: (error) => {
        console.error('Error submitting leave request:', error);
        Swal.fire('Error', 'Failed to submit leave request.', 'error');
      },
      complete: () => {
        console.log('Leave request submission completed.');
      }
    });
  }
}    
