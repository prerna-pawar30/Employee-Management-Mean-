// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../../services/auth.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import Swal from 'sweetalert2';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// interface LeaveRequest {
//   _id?: string;
//   employeeId: string;
//   reason: string;
//   date: string;
//   status?: string;
// }

// @Component({
//   selector: 'app-leave-employee',
//   templateUrl: './employee-leave.component.html',
//   styleUrls: ['./employee-leave.component.css'],
//   imports: [FormsModule, CommonModule],
// })
// export class EmployeeleaveComponent implements OnInit {
//   newLeaveRequest: { employeeId: string; reason: string; date: string; status: string } = {
//     employeeId: '',
//     reason: '',
//     date: '',
//     status: 'pending'
//   }
//   leaveRequests: LeaveRequest[] = [];

//   constructor(
//     private http: HttpClient,
//     private authService: AuthService,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit() {
//     this.loadEmployeeId();
//     this.loadEmployeeLeaveRequests();
//   }

//   loadEmployeeId() {
//     const user = JSON.parse(localStorage.getItem('user')!); // Get logged-in user
//     if (user && user._id) {
//       this.newLeaveRequest.employeeId = user._id; // Set employee ID
//     } else {
//       Swal.fire('Error', 'User not found. Please log in again.', 'error');
//     }
//   }

//   submitLeaveRequest() {
//     if (!this.newLeaveRequest.reason || !this.newLeaveRequest.date) {
//       return;
//     }

//     this.http.post('http://localhost:3000/api/leave/', this.newLeaveRequest).subscribe(
//       () => {
//         this.snackBar.open('Leave request submitted successfully!', 'Close', {
//           duration: 3000,
//         });
//         this.newLeaveRequest.reason = '';
//         this.newLeaveRequest.date = '';
//         this.newLeaveRequest.status = 'pending';
//         this.loadEmployeeLeaveRequests(); // Refresh list after submission
//       },
//       (error) => {
//         console.error('Error submitting leave request:', error);
//         this.snackBar.open('Failed to submit leave request.', 'Close', {
//           duration: 3000,
//         });
//       }
//     );
//   }

//   // ✅ Fetch employee's own leave requests
//   loadEmployeeLeaveRequests() {
//     const user = JSON.parse(localStorage.getItem('user')!);
//     if (user && user._id) {
//       this.http.get<LeaveRequest[]>(`http://localhost:3000/api/leave/employee/${user._id}`).subscribe(
//         (data) => {
//           this.leaveRequests = data; // Update leave requests array
//         },
//         (error) => {
//           console.error('Error fetching leave requests:', error);
//           this.snackBar.open('Failed to fetch leave requests.', 'Close', {
//             duration: 3000,
//           });
//         }
//       );
//     }
//   }
// }




import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-leave-employee',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule], // ✅ Import FormsModule Here
})
export class EmployeeleaveComponent implements OnInit {
  newLeaveRequest = {
    employeeId: '',
    reason: '',
    date: '',
    status: 'pending',
    type: '',
  };

  leaveTypes = [
    { type: 'Annual Leave', available: 20, booked: 5 },
    { type: 'Casual Leave', available: 12, booked: 2 },
    { type: 'Sick Leave', available: 12, booked: 0 },
    { type: 'Maternity Leave', available: 182, booked: 0 },
    { type: 'Optional Holiday', available: 3, booked: 0 }
  ];

  leaveRequests: any[] = [];

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadEmployeeId();
    this.loadEmployeeLeaveRequests();
  }

  loadEmployeeId() {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user && user._id) {
      this.newLeaveRequest.employeeId = user._id;
    }
  }

  submitLeaveRequest() {
    if (!this.newLeaveRequest.reason || !this.newLeaveRequest.date || !this.newLeaveRequest.type) {
      return;
    }

    this.http.post('http://localhost:3000/api/leave/', this.newLeaveRequest).subscribe(() => {
      this.snackBar.open('Leave request submitted successfully!', 'Close', { duration: 3000 });
      this.newLeaveRequest.reason = '';
      this.newLeaveRequest.date = '';
      this.newLeaveRequest.type = '';
      this.newLeaveRequest.status = 'pending';
      this.loadEmployeeLeaveRequests();
    });
  }

  loadEmployeeLeaveRequests() {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user && user._id) {
      this.http.get<any[]>(`http://localhost:3000/api/leave/employee/${user._id}`).subscribe((data) => {
        this.leaveRequests = data;
      });
    }
  }
}
