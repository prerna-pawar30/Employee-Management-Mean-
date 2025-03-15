
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

interface Employee {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  project: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['name', 'email', 'mobileNumber', 'project', 'actions'];
  adminLeaves: any[] = [];

  authService = inject(AuthService);
  router = inject(Router);
  http = inject(HttpClient);

  ngOnInit(): void {
    if (!this.authService.isAdmin) {
      this.router.navigateByUrl('/'); // Redirect non-admin users
    } else {
      this.getAllLeaves(); // Load leave requests if admin
    }
  }

  // Fetch all leave requests for admin
  getAllLeaves() {
    this.http.get<any[]>('http://localhost:3000/api/leave/all').subscribe(
      (data) => {
        this.adminLeaves = data;
      },
      (error) => {
        console.error('Error fetching leave requests:', error);
      }
    );
  }

  // Confirm before approving/rejecting leave
  confirmAction(leaveId: string, status: string) {
    Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to mark this leave as ${status}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.updateLeaveStatus(leaveId, status);
      }
    });
  }

  // Update leave status
  updateLeaveStatus(leaveId: string, status: string) {
    this.http.put(`http://localhost:3000/api/leave/update/${leaveId}`, { status }).subscribe(
      () => {
        Swal.fire('Updated!', `Leave marked as ${status}`, 'success');
        this.getAllLeaves(); // Refresh leave list
      },
      (error) => {
        Swal.fire('Error', 'Failed to update leave status', 'error');
      }
    );
  }
}
