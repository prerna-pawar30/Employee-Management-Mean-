import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface LeaveRequest {
  _id: string;
  employeeId?: { _id: string; name: string; email: string };  // Allow optional to prevent errors
  reason: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-leave',
  templateUrl: './leave-employee.component.html',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, CommonModule, MatProgressSpinnerModule]

})
export class LeaveComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];
  displayedColumns: string[] = ['employee', 'email', 'reason', 'date', 'status', 'actions'];
  isAdmin: boolean = false;
  loading: boolean = false;

  authService = inject(AuthService);
  http = inject(HttpClient);
  snackBar = inject(MatSnackBar);

  async ngOnInit(): Promise<void> {
    this.isAdmin = await this.authService.isAdmin;
    this.getLeaveRequests();
  }

  getLeaveRequests() {
    this.loading = true;
    const apiUrl = this.isAdmin
      ? 'http://localhost:3000/api/leave/all'
      : `http://localhost:3000/api/leave/${this.authService.getUserId()}`;

    this.http.get<LeaveRequest[]>(apiUrl).subscribe(
      (data) => {
        this.leaveRequests = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching leave requests:', error);
        this.snackBar.open('Failed to fetch leave requests.', 'Close', { duration: 3000 });
        this.loading = false;
      }
    );
  }

  confirmAction(leaveId: string, status: string) {
    Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to mark this leave as ${status.toLowerCase()}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${status.toLowerCase()}`,
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateLeaveStatus(leaveId, status.toLowerCase());
      }
    });
  }

  updateLeaveStatus(leaveId: string, status: string) {
    this.http.put(`http://localhost:3000/api/leave/update/${leaveId}`, { status }).subscribe(
      () => {
        this.snackBar.open(`Leave marked as ${status}`, 'Close', { duration: 3000 });
        this.getLeaveRequests();
      },
      (error) => {
        console.error("Error updating leave:", error);
        Swal.fire('Error', 'Failed to update leave status', 'error');
      }
    );
  }
}
