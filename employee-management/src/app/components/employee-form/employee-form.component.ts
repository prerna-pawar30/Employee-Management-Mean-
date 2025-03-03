import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import {  RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  @Input() employeeId?: string;
  employeeForm!: FormGroup;
  uploadedFiles: { [key: string]: File[] } = {}; // To store uploaded files

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],

      education: this.fb.group({
        tenth: ['', Validators.required],
        twelfth: ['', Validators.required],
        diploma: [''],
        degree: ['', Validators.required]
      }),

      officialDetails: this.fb.group({
        employeeId: ['', Validators.required],
        department: ['', Validators.required],
        designation: ['', Validators.required],
        joiningDate: ['', Validators.required]
      }),

      achievements: [''],
      resume: ['']
    });

    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('id') || undefined;
      if (this.employeeId) {
        this.loadEmployeeData();
      }
    });
  }

  loadEmployeeData() {
    const employeeData = {
      name: 'John Doe',
      dob: '1990-05-15',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St, City, Country',
      education: { tenth: 85, twelfth: 90, diploma: 'IT', degree: 'B.Tech' },
      officialDetails: { employeeId: 'EMP123', department: 'IT', designation: 'Software Engineer', joiningDate: '2022-01-10' },
      achievements: 'Best Employee of 2023',
      resume: ''
    };
    this.employeeForm.patchValue(employeeData);
  }

  onFileSelect(event: any, key: string) {
    this.uploadedFiles[key] = Array.from(event.target.files);
  }

  addEmployee() {
    console.log('Employee Added:', this.employeeForm.value, this.uploadedFiles);
    this.router.navigate(['/employees']);
  }

  updateEmployee() {
    console.log('Employee Updated:', this.employeeForm.value, this.uploadedFiles);
    this.router.navigate(['/employees']);
  }
}