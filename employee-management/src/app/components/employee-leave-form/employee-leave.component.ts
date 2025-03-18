// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-leave-employee',
//   templateUrl: './employee-leave.component.html',
//   styleUrls: ['./employee-leave.component.css'],
//   standalone: true,
//   imports: [FormsModule, CommonModule], // ✅ Import FormsModule Here
// })
// export class EmployeeleaveComponent implements OnInit {
//   newLeaveRequest = {
//     employeeId: '',
//     reason: '',
//     date: '',
//     status: 'pending',
//     type: '',
//   };

//   leaveTypes = [
//     { type: 'Annual Leave', available: 20, booked: 5 },
//     { type: 'Casual Leave', available: 12, booked: 2 },
//     { type: 'Sick Leave', available: 12, booked: 0 },
//     { type: 'Maternity Leave', available: 182, booked: 0 },
//     { type: 'Optional Holiday', available: 3, booked: 0 }
//   ];

//   leaveRequests: any[] = [];

//   constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

//   ngOnInit() {
//     this.loadEmployeeId();
//     this.loadEmployeeLeaveRequests();
//   }

//   loadEmployeeId() {
//     const user = JSON.parse(localStorage.getItem('user')!);
//     if (user && user._id) {
//       this.newLeaveRequest.employeeId = user._id;
//     }
//   }

//   submitLeaveRequest() {
//     if (!this.newLeaveRequest.reason || !this.newLeaveRequest.date || !this.newLeaveRequest.type) {
//       return;
//     }

//     this.http.post('http://localhost:3000/api/leave/', this.newLeaveRequest).subscribe(() => {
//       this.snackBar.open('Leave request submitted successfully!', 'Close', { duration: 3000 });
//       this.newLeaveRequest.reason = '';
//       this.newLeaveRequest.date = '';
//       this.newLeaveRequest.type = '';
//       this.newLeaveRequest.status = 'pending';
//       this.loadEmployeeLeaveRequests();
//     });
//   }

//   loadEmployeeLeaveRequests() {
//     const user = JSON.parse(localStorage.getItem('user')!);
//     if (user && user._id) {
//       this.http.get<any[]>(`http://localhost:3000/api/leave/employee/${user._id}`).subscribe((data) => {
//         this.leaveRequests = data;
//       });
//     }
//   }
// }



import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SideBarComponent } from "../side-bar/side-bar.component";

@Component({
  selector: 'app-leave-employee',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, SideBarComponent], // ✅ Import FormsModule Here
})
export class EmployeeleaveComponent  implements OnInit {
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
  apiUrl = 'http://localhost:3000/api/leave'; // ✅ Ensure backend URL is correct

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
    if (!this.newLeaveRequest.reason || !this.newLeaveRequest.date || !this.newLeaveRequest.type) {
      this.snackBar.open('Please fill all fields before submitting.', 'Close', { duration: 3000 });
      return;
    }

    this.http.post(this.apiUrl, this.newLeaveRequest).subscribe(
      () => {
        this.snackBar.open('Leave request submitted successfully!', 'Close', { duration: 3000 });
        this.resetForm();
        this.loadEmployeeLeaveRequests(); // ✅ Refresh leave history
      },
      (error) => {
        console.error('Error submitting leave request:', error);
        this.snackBar.open('Failed to submit leave request.', 'Close', { duration: 3000 });
      }
    );
  }

  loadEmployeeLeaveRequests() {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user && user._id) {
      this.http.get<any[]>(`${this.apiUrl}/employee/${user._id}`).subscribe(
        (data) => {
          console.log('Fetched leave requests:', data); // ✅ Debugging
          this.leaveRequests = data;
        },
        (error) => {
          console.error('Error fetching leave requests:', error);
          this.snackBar.open('Failed to fetch leave requests.', 'Close', { duration: 3000 });
        }
      );
    }
  }

  resetForm() {
    this.newLeaveRequest.reason = '';
    this.newLeaveRequest.date = '';
    this.newLeaveRequest.type = '';
    this.newLeaveRequest.status = 'pending';
  }
}

