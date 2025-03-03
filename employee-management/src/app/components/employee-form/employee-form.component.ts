import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  imports: [MatFormFieldModule,ReactiveFormsModule]
})
export class EmployeeFormComponent implements OnInit {
onFileSelect($event: Event,arg1: string) {
throw new Error('Method not implemented.');
}
  employeeForm!: FormGroup;
  employeeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(EmployeeService) private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: [''],
      dob: [''],
      email: [''],
      phone: [''],
      address: [''],
      education: this.fb.group({
        tenth: [''],
        twelfth: [''],
        diploma: [''],
        degree: ['']
      }),
      officialDetails: this.fb.group({
        employeeId: [''],
        department: [''],
        designation: [''],
        joiningDate: ['']
      })
    });

    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('id');
      if (this.employeeId) {
        this.employeeService.getEmployeeById(this.employeeId).subscribe(data => {
          this.employeeForm.patchValue(data);
        });
      }
    });
  }

  addEmployee() {
    this.employeeService.addEmployee(this.employeeForm.value).subscribe(() => {
      this.router.navigate(['/admin/employees']);
    });
  }

  updateEmployee() {
    if (this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value).subscribe(() => {
        this.router.navigate(['/admin/employees']);
      });
    }
  }
}
