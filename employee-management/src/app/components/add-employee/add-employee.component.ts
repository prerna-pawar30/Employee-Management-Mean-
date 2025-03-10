import { Component } from '@angular/core';
import { EmployeeModel } from '../../../../model/employee';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  imports:[FormsModule,   CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  employee: EmployeeModel = new EmployeeModel();

  constructor(private employeeService: EmployeeService, private router: Router) {}

  onFileSelected(event: any, type: string) {
    const file: File = event.target.files[0];
    if (file) {
      if (type === 'marksheet') {
        this.employee.marksheet = file;
      } else if (type === 'resume') {
        this.employee.resume = file;
      }
    }
  }

  onSaveEmployee(): void {
    this.employeeService.saveEmployee(this.employee).subscribe(
      () => {
        alert('Employee Details Saved Successfully');
      },
      (error) => {
        console.error('Error saving employee', error);
        alert('Failed to save employee');
      }
    );
  }
}
