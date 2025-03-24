import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PayrollService {
  private apiUrl = 'http://localhost:3000/api/payroll';

  constructor(private http: HttpClient) {}

  getPayrolls(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addPayroll(payroll: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, payroll);
  }

  updatePayroll(id: string, payroll: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, payroll);
  }

  deletePayroll(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
