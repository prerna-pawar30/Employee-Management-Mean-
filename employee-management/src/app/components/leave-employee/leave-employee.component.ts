import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave',
  templateUrl: './leave-employee.component.html',
  styleUrls: ['./leave-employee.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LeaveEmployeeComponent implements OnInit {
  newLeave = { employeeId: '', reason: '', date: '' };
  adminLeaves: any[] = [];
  isAdmin = false;

  authService = inject(AuthService);
  http = inject(HttpClient);

  ngOnInit() {
    this.checkAdminStatus();
    if (this.isAdmin) {
      this.getAllLeaves(); // Fetch leave requests only if the user is an admin
    }
  }

  // Check if user is an admin
  checkAdminStatus() {
    this.isAdmin = this.authService.isAdmin;
  }

  // ✅ Get all leave requests for admin
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

  // ✅ Apply for leave (Employee)
  applyLeave() {
    if (!this.newLeave.employeeId || !this.newLeave.reason || !this.newLeave.date) {
      Swal.fire('Error', 'All fields are required!', 'error');
      return;
    }

    this.http.post('http://localhost:3000/api/leave/applyleave', this.newLeave).subscribe(
      (response: any) => {
        Swal.fire('Success!', 'Leave request submitted!', 'success');
        this.newLeave = { employeeId: '', reason: '', date: '' }; // Reset form
        if (this.isAdmin) this.getAllLeaves(); // Refresh leave list for admin
      },
      (error) => {
        Swal.fire('Error', 'Failed to submit leave request', 'error');
      }
    );
  }

  // ✅ Confirm before approving/rejecting
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

  // ✅ Update leave status
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
