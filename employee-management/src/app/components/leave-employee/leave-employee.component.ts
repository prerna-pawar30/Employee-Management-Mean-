import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-leave-employee',
  standalone: true, // ✅ Required for Angular 19
  imports: [FormsModule, DatePipe, CommonModule],
  templateUrl: './leave-employee.component.html',
  styleUrl: './leave-employee.component.css'
})
export class LeaveEmployeeComponent implements OnInit {
  leaves: any[] = [];
  newleave = { employeeId: '', reason: '', date: '' };

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.getAllleave();
  }

  getAllleave() {
    this.leaveService.getAllleave().subscribe((data) => {
      this.leaves = data; // ✅ Corrected
    });
  }

  applyleave() {
    console.log("📤 Sending leave request:", this.newleave); // Debugging
  
    this.leaveService.applyleave(this.newleave).subscribe(
      (response) => {
        console.log("✅ Leave Applied Successfully:", response); // Log success
        this.getAllleave();
      },
      (error) => {
        console.error("❌ Error Applying Leave:", error); // Log errors
      }
    );
  }
  

  updateleave(id: string, status: string) {
    this.leaveService.updateleaveStatus(id, status).subscribe(() => {
      this.getAllleave();
    });
  }
}
