import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeData: any;
  getStatistics() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}
  setEmployee(employee: any) {
    this.employeeData.next(employee);
  }

  addEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, employeeData);
  }

  getEmployees(employee: any): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEmployeeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateEmployee(id: string, employeeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, employeeData);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
