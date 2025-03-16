// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import Swal from 'sweetalert2';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { LeaveService } from '../../services/leave.service';

// @Component({
//   selector: 'app-employee-dashboard',
//   templateUrl: './employee-dashboard.component.html',
//   styleUrls: ['./employee-dashboard.component.css'],
//   standalone: true,
//   imports: [FormsModule, CommonModule]
// })
// export class EmployeeDashboardComponent implements OnInit {
//   isCheckedIn: boolean = false;
//   newLeaveRequest = { employeeId: '', reason: '', date: '' };

//   constructor(private http: HttpClient, private leaveService : LeaveService) {}

//   ngOnInit() {
//     this.loadCheckInStatus();
//     this.loadEmployeeId();  // Load Employee ID when the component initializes
//   }

//   loadCheckInStatus() {
//     this.isCheckedIn = localStorage.getItem('isCheckedIn') === 'true';
//   }

//   loadEmployeeId() {
//     const user = JSON.parse(localStorage.getItem('user')!); // Get logged-in user
//     if (user && user._id) {
//       this.newLeaveRequest.employeeId = user._id; // Set employee ID
//     } else {
//       Swal.fire('Error', 'User not found. Please log in again.', 'error');
//     }
//   }

//   checkIn() {
//     this.isCheckedIn = true;
//     localStorage.setItem('isCheckedIn', 'true');

//     Swal.fire({
//       title: 'Checked In!',
//       text: 'You have successfully checked in.',
//       icon: 'success',
//       timer: 2000,
//       showConfirmButton: false
//     });
//   }

//   checkOut() {
//     this.isCheckedIn = false;
//     localStorage.setItem('isCheckedIn', 'false');

//     Swal.fire({
//       title: 'Checked Out!',
//       text: 'You have successfully checked out.',
//       icon: 'info',
//       timer: 2000,
//       showConfirmButton: false
//     });
//   }

//   submitLeaveRequest() {
//     console.log('Before Submit - Leave Data:', this.newLeaveRequest); // Debug log ✅

//     if (!this.newLeaveRequest.employeeId) {
//       Swal.fire('Error', 'Employee ID is missing. Please log in again.', 'error');
//       return;
//     }

//     if (!this.newLeaveRequest.reason || !this.newLeaveRequest.date) {
//       Swal.fire('Error', 'Please enter a leave reason and date.', 'error');
//       return;
//     }

//     const leaveData = {
//       employeeId: this.newLeaveRequest.employeeId,  // Ensure employee ID is included
//       reason: this.newLeaveRequest.reason,
//       date: this.newLeaveRequest.date,
//       status: 'Pending' // Default status
//     };

//     this.leaveService.submitLeave(leaveData).subscribe({
//       next: (response) => {
//         console.log('Leave request submitted successfully:', response);
//         Swal.fire('Success', 'Leave request submitted.', 'success');
//         this.newLeaveRequest = { employeeId: this.newLeaveRequest.employeeId, reason: '', date: '' }; // Reset form, keep ID
//       },
//       error: (error) => {
//         console.error('Error submitting leave request:', error);
//         Swal.fire('Error', 'Failed to submit leave request.', 'error');
//       },
//       complete: () => {
//         console.log('Leave request submission completed.');
//       }
//     });
//   }
// }    



import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CheckInOutService } from '../../services/check-in-out.service';
import { LeaveService } from '../../services/leave.service';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink]
})
export class EmployeeDashboardComponent implements OnInit {
  isCheckedIn: boolean = false;
  lastCheckIn: Date | null = null;
  lastCheckOut: Date | null = null;
  elapsedTime: number = 0;
  employeeId: string | null = null;
  workRecords: any[] = [];
  userName: string = '';

  newLeaveRequest = { employeeId: '', reason: '', date: '' };

  constructor(
    @Inject(AuthService) public authService: AuthService,
    private checkInOutService: CheckInOutService,
    private leaveService: LeaveService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadEmployeeId();
  }
  loadEmployeeId() {
    const user = this.authService.getCurrentUser();
    
    if (user && typeof user._id === 'string' && user._id.trim() !== '') {
      this.employeeId = user._id;
      this.userName = user.name?.trim() || 'Employee';
      
      this.newLeaveRequest = {
        employeeId: this.employeeId || '',
        reason: '',
        date: ''
      };
  
      this.fetchWorkRecords();
    } else {
      Swal.fire('Error', 'User not found. Please log in again.', 'error');
      console.error('User ID not found or invalid in AuthService.');
    }
  }
  
  checkIn() {
    if (!this.employeeId) {
      Swal.fire('Error', 'User ID missing. Please log in again.', 'error');
      return;
    }
  
    console.log('Attempting to check in with Employee ID:', this.employeeId);
  
    this.checkInOutService.checkIn(this.employeeId).subscribe(
      (response) => {
        console.log('Check-in response:', response);
        this.isCheckedIn = true;
        this.lastCheckIn = new Date();
        this.elapsedTime = 0;
        Swal.fire('Checked In', 'You have successfully checked in.', 'success');
      },
      (error) => {
        console.error('Error during check-in:', error);
        Swal.fire('Error', 'Failed to check in. Check the console for details.', 'error');
      }
    );
  }
  
  checkOut() {
    if (!this.employeeId) {
      Swal.fire('Error', 'User ID missing. Please log in again.', 'error');
      return;
    }

    this.checkInOutService.checkOut(this.employeeId).subscribe(
      () => {
        this.isCheckedIn = false;
        this.lastCheckOut = new Date();
        Swal.fire('Checked Out', 'You have successfully checked out.', 'info');
      },
      (error) => {
        console.error('Error during check-out:', error);
        Swal.fire('Error', 'Failed to check out.', 'error');
      }
    );
  }

  fetchWorkRecords() {
    if (!this.employeeId) return;

    this.http.get(`${environment.apiUrl}/api/check-in-out/history/${this.employeeId}`).subscribe(
      (res: any) => {
        if (!res.history) {
          console.warn('No history data received.');
          return;
        }

        this.workRecords = res.history.map((record: any) => ({
          date: new Date(record.checkInTime).toISOString().split('T')[0],
          checkInTime: new Date(record.checkInTime),
          checkOutTime: record.checkOutTime ? new Date(record.checkOutTime) : null,
          duration: record.checkOutTime ? new Date(record.checkOutTime).getTime() - new Date(record.checkInTime).getTime() : 0
        }));
      },
      (error) => {
        console.error('Error fetching work records:', error);
        Swal.fire('Error', 'Failed to load work history.', 'error');
      }
    );
  }


  formatTime(milliseconds: number): string {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  }
}