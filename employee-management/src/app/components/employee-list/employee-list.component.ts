import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,  // ✅ Add this line!
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']  // ✅ Use styleUrls (plural)
})
export class EmployeeListComponent {

  employeeList: any[] = [];
  name: string = '';
  email: string = '';
  address: string = '';
  dob: string = '';

  constructor(private http: HttpClient) {}

  getSeller() {
    this.http.get<any[]>("http://localhost:3000/employee").subscribe((result) => {
      this.employeeList = result;
    });
  }

  onSubmit() {
    const newSeller = {
      name: this.name,
      email: this.email,
      address: this.address,
      dob: this.dob
    };
    console.log("Submitted Data:", newSeller);
  }
}
