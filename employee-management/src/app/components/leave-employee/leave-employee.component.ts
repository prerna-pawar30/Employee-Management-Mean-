import Swal from "sweetalert2";

import { Component, Inject, OnInit } from '@angular/core';
import { LeaveService } from "../../services/leave.service";
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from "@angular/common";
@Component({
  selector: 'app-leave-employee',
  templateUrl: './leave-employee.component.html',
  styleUrls: ['./leave-employee.component.css'],
  imports: [FormsModule,DatePipe,CommonModule]
})
export class LeaveEmployeeComponent implements OnInit {
  leaves: any[] = [];
  newleave = { employeeId: '', reason: '', date: '' };

  constructor(@Inject(LeaveService) private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.getAllleave();
  }

  getAllleave() {
    this.leaveService.getAllleave().subscribe((data) => {
      this.leaves = data;
    });
  }

  applyleave() {
   

    // ✅ Ensure all fields are correctly populated before submission
    if (!this.newleave.employeeId.trim() || !this.newleave.reason.trim() || !this.newleave.date) {
      Swal.fire('Error', 'All fields are required!', 'error');
      return;
    }

    Swal.fire({
      title: 'Confirm Leave Application',
      text: 'Do you want to submit this leave request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit',
      cancelButtonText: 'No, Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.leaveService.applyleave({ ...this.newleave }).subscribe(
          (response) => {
            Swal.fire('Success', 'Leave request submitted and email sent!', 'success');
            this.getAllleave();
            this.clearForm(); // ✅ Reset the form after submission
          },
          (error) => {
            Swal.fire('Error', 'Failed to submit leave request!', 'error');
          }
        );
      }
    });
  }

  // ✅ Function to clear the form after submission
  clearForm() {
    this.newleave = { employeeId: '', reason: '', date: '' };
  }

  updateleave(id: string, status: string) {
    this.leaveService.updateleaveStatus(id, status).subscribe(() => {
      this.getAllleave();
    });
  }
}
