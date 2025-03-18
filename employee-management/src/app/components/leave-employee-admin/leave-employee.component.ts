import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { MatCardModule } from '@angular/material/card';

interface LeaveRequest {
  _id: string;
  employeeId: { _id: string; name: string; email: string };
  reason: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-leave',
  templateUrl: './leave-employee.component.html',
  styleUrl:'./leave-employee.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    SideBarComponent
],
})
export class LeaveComponent implements OnInit {
  displayedColumns: string[] = ['employee', 'email', 'reason', 'date', 'status', 'actions'];
  dataSource = new MatTableDataSource<LeaveRequest>([]);
  isAdmin: boolean = false;
  loading: boolean = false;
  newLeaveRequest: Partial<LeaveRequest> = {};

  authService = inject(AuthService);
  http = inject(HttpClient);
  snackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  async ngOnInit(): Promise<void> {
    this.isAdmin = await this.authService.isAdmin; // Assuming this returns a boolean
    this.getLeaveRequests();
  }
  loadEmployeeId() {
          const user = JSON.parse(localStorage.getItem('user')!); // Get logged-in user
          if (user && user._id) {
            this.newLeaveRequest.employeeId = user._id; // Set employee ID
          } else {
            Swal.fire('Error', 'User not found. Please log in again.', 'error');
          }
        }

  
  getLeaveRequests(): void {
    this.loading = true;
    const apiUrl = this.isAdmin
      ? 'http://localhost:3000/api/leave/all'
      : `http://localhost:3000/api/leave/${this.authService.getUserId()}`;

    this.http.get<LeaveRequest[]>(apiUrl).subscribe(
      (data) => {
        this.dataSource.data = data;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching leave requests:', error);
        this.snackBar.open('Failed to fetch leave requests.', 'Close', { duration: 3000 });
        this.loading = false;
      }
    );
  }

  confirmAction(leaveId: string, status: string): void {
    const formattedStatus = status.toLowerCase();

    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to mark this leave as ${formattedStatus}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${formattedStatus}`,
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateLeaveStatus(leaveId, formattedStatus);
      }
    });
  }

  updateLeaveStatus(leaveId: string, status: string): void {
    this.http.put(`http://localhost:3000/api/leave/update/${leaveId}`, { status }).subscribe(
      () => {
        this.snackBar.open(`Leave marked as ${status}`, 'Close', { duration: 3000 });
        this.getLeaveRequests();
      },
      (error) => {
        console.error('Error updating leave:', error);
        Swal.fire('Error', 'Failed to update leave status', 'error');
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
