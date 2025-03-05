import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  editingEmployeeId: string | null = null;
  employeeList: any[] = [];

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.editingEmployeeId) {
      const index = this.employeeList.findIndex(emp => emp.id === this.editingEmployeeId);
      if (index !== -1) {
        this.employeeList[index] = {
          id: this.editingEmployeeId,
          ...this.employeeForm.value
        };
        console.log('Employee updated:', this.employeeList[index]);
      }
    } else {
      const newEmployee = {
        id: this.generateId(),
        ...this.employeeForm.value
      };
      this.employeeList.push(newEmployee);
      console.log('New employee added:', newEmployee);
    }
    this.resetForm();
  }

  onEdit(employee: any): void {
    this.editingEmployeeId = employee.id;
    this.employeeForm.patchValue(employee);
  }

  onDelete(id: string): void {
    this.employeeList = this.employeeList.filter(emp => emp.id !== id);
    console.log('Employee deleted with ID:', id);
    if (this.editingEmployeeId === id) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.employeeForm.reset();
    this.editingEmployeeId = null;
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}