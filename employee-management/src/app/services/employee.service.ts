import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employee';

  constructor(private http: HttpClient) {}

  saveEmployee(employee: any): Observable<any> {
    const formData = new FormData();
    
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("mobNo", employee.mobNo.toString());
    formData.append("deptName", employee.deptName);
    formData.append("dob", employee.dob);
    formData.append("address", employee.address);
    formData.append("graduation", employee.graduation);
    formData.append("designation", employee.designation);
    formData.append("salary", employee.salary);
    formData.append("joiningDate", employee.joiningDate);
    
    if (employee.marksheet) {
      formData.append("marksheet", employee.marksheet);
    }
    
    if (employee.resume) {
      formData.append("resume", employee.resume);
    }

    return this.http.post<any>(this.apiUrl, formData);
  }
}
