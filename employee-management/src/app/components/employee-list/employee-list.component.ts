import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-employee-list',
  standalone: true, // ✅ Add this line!
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'], // ✅ Use styleUrls (plural)
})
export class EmployeeListComponent {
  employeeList: any[] = [];
  name: string = '';
  email: string = '';
  address: string = '';
  dob: string = '';
  deptName: string = '';
  mobNo: String = '';
  graduation: String = '';
  designation: String = '';
  salary: String = '';
  joiningDate: String = '';
  editingEmployeeId: string | null = null;

  constructor(private http: HttpClient) {}

  getSeller() {
    this.http
      .get<any[]>('http://localhost:3000/employee')
      .subscribe((result) => {
        this.employeeList = result;
      });
  }
  onEdit(employee: any) {
    this.editingEmployeeId = employee.id || employee._id;
    this.name = employee.name;
    this.email = employee.email;
    this.address = employee.address;
    this.dob = employee.dob;
    this.mobNo = employee.mobNo;
    this.deptName = employee.deptName;

    this.graduation = employee.graduation;
    this.designation = employee.designation;
    this.salary = employee.salary;
    this.joiningDate = employee.joiningDate;
  }

  onSubmit() {
    const newSeller = {
      name: this.name,
      email: this.email,
      address: this.address,
      dob: this.dob,
      mobNo :this.mobNo,
    deptName : this.deptName,

    graduation : this.graduation,
    designation : this.designation,
    salary : this.salary,
    joiningDate : this.joiningDate,
    };

    if (this.editingEmployeeId) {
      // Update Employee
      this.http
        .put(
          `http://localhost:3000/employee/${this.editingEmployeeId}`,
          newSeller
        )
        .subscribe(() => {
          this.getSeller(); // Refresh list
          this.resetForm();
        });
    } else {
      // Add New Employee
      this.http
        .post('http://localhost:3000/employee', newSeller)
        .subscribe(() => {
          this.getSeller();
          this.resetForm();
        });
    }
  }

  // Delete Employee
  onDelete(employeeId: string) {
    this.http
      .delete(`http://localhost:3000/employee/${employeeId}`)
      .subscribe(() => {
        this.getSeller();
      });
  }

  // Reset form
  resetForm() {
    this.name = '';
    this.email = '';
    this.address = '';
    this.dob = '';
    this.editingEmployeeId = null;
  }
}
// console.log("Submitted Data:", newSeller);
