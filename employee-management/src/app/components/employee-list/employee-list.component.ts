import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  employeeList: any[] = [];
  name: string = '';
  email: string = '';
  address: string = '';
  dob: string = '';
  deptName: string = '';
  mobNo: string = '';
  graduation: string = '';
  designation: string = '';
  salary: string = '';
  joiningDate: string = '';
  editingEmployeeId: string | null = null;

  constructor(private http: HttpClient) {}

  getSeller() {
    this.http.get<any[]>('http://localhost:3000/employee').subscribe((result) => {
      this.employeeList = result.map(employee => ({
        ...employee,
        marksheetUrl: `http://localhost:3000/uploads/${employee.marksheet}`,
        resumeUrl: `http://localhost:3000/uploads/${employee.resume}`
      }));
    });
  }

  onEdit(employee: any) {
    this.editingEmployeeId = employee._id;
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
      mobNo: this.mobNo,
      deptName: this.deptName,
      graduation: this.graduation,
      designation: this.designation,
      salary: this.salary,
      joiningDate: this.joiningDate,
    };

    if (this.editingEmployeeId) {
      this.http.put(`http://localhost:3000/employee/${this.editingEmployeeId}`, newSeller)
        .subscribe(() => {
          this.getSeller();
          this.resetForm();
        });
    } else {
      this.http.post('http://localhost:3000/employee', newSeller)
        .subscribe(() => {
          this.getSeller();
          this.resetForm();
        });
    }
  }

  onDelete(employeeId: string) {
    this.http.delete(`http://localhost:3000/employee/${employeeId}`)
      .subscribe(() => {
        this.getSeller();
      });
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.address = '';
    this.dob = '';
    this.editingEmployeeId = null;
  }

  // ✅ Correctly added inside the class
  viewDocument(fileName: string) {
    if (!fileName) {
      console.error("No file provided.");
      return;
    }
    window.open(`http://localhost:3000/uploads/${fileName}`, "_blank");
  }
  
}
