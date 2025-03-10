import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  employeeList: any[] = [];
  name = '';
  email = '';
  address = '';
  dob = '';
  deptName = '';
  mobNo = '';
  graduation = '';
  designation = '';
  salary = '';
  joiningDate = '';
  editingEmployeeId: string | null = null;

  constructor(private http: HttpClient) {}

  getSeller() {
    this.http.get<any[]>('http://localhost:3000/employee').subscribe((result) => {
      this.employeeList = result.map(employee => ({
        ...employee,
        marksheetUrl: employee.marksheet ? `http://localhost:3000/uploads/${employee.marksheet}` : null,
        resumeUrl: employee.resume ? `http://localhost:3000/uploads/${employee.resume}` : null
      }));
    });
  }

  onEdit(employee: any) {
    console.log(employee);
    this.editingEmployeeId = employee._id;
    this.name = employee.name;
    this.email = employee.email;
    this.address = employee.address;
    this.dob = employee.dob ? new Date(employee.dob).toISOString().split('T')[0] : '';
    this.mobNo = employee.mobNo;
    this.deptName = employee.deptName;
    this.graduation = employee.graduation;
    this.designation = employee.designation;
    this.salary = employee.salary;
    this.joiningDate = employee.joiningDate ? new Date(employee.joiningDate).toISOString().split('T')[0] : '';
  }

  onSubmit() {
    if (!this.name || !this.email || !this.mobNo) {
      Swal.fire('Error', 'Name, Email, and Mobile No are required!', 'error');
      return;
    }

    const employeeData = {
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
      this.http.put(`http://localhost:3000/employee/${this.editingEmployeeId}`, employeeData)
        .subscribe(() => {
          Swal.fire('Success', 'Employee updated successfully', 'success');
          this.getSeller();
          this.resetForm();
        });
    } else {
      this.http.post('http://localhost:3000/employee', employeeData)
        .subscribe(() => {
          Swal.fire('Success', 'Employee added successfully', 'success');
          this.getSeller();
          this.resetForm();
        });
    }
  }

  onDelete(employeeId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:3000/employee/${employeeId}`).subscribe(() => {
          Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
          this.getSeller();
        });
      }
    });
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.address = '';
    this.dob = '';
    this.mobNo = '';
    this.deptName = '';
    this.graduation = '';
    this.designation = '';
    this.salary = '';
    this.joiningDate = '';
    this.editingEmployeeId = null;
  }

  viewDocument(filePath: string) {
    if (!filePath) {
      Swal.fire('Error', 'Document not found!', 'error');
      return;
    }
    window.open(filePath, "_blank");
  }
}
