import { Component, OnInit } from '@angular/core';
import { PayrollService } from '../../services/payroll.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css'],
  imports:[FormsModule,CommonModule]
})
export class PayrollComponent implements OnInit {
  payrolls: any[] = [];
  newPayroll = { employeeId: '', basicSalary: 0, deductions: 0, bonuses: 0, totalSalary: 0 };

  constructor(private payrollService: PayrollService) {}

  ngOnInit(): void {
    this.fetchPayrolls();
  }

  // Fetch payroll data from the backend
  fetchPayrolls() {
    this.payrollService.getPayrolls().subscribe(data => {
      this.payrolls = data;
    }, error => {
      console.error('Error fetching payroll data', error);
    });
  }

  // Add new payroll
  addPayroll() {
    this.newPayroll.totalSalary = this.newPayroll.basicSalary - this.newPayroll.deductions + this.newPayroll.bonuses;

    this.payrollService.addPayroll(this.newPayroll).subscribe(response => {
      this.fetchPayrolls(); // Refresh list after adding
      this.resetForm();
    }, error => {
      console.error('Error adding payroll', error);
    });
  }

  // Delete payroll record
  deletePayroll(id: string) {
    if (confirm('Are you sure you want to delete this payroll record?')) {
      this.payrollService.deletePayroll(id).subscribe(() => {
        this.fetchPayrolls();
      }, error => {
        console.error('Error deleting payroll record', error);
      });
    }
  }

  // Reset form fields
  resetForm() {
    this.newPayroll = { employeeId: '', basicSalary: 0, deductions: 0, bonuses: 0, totalSalary: 0 };
  }
}
