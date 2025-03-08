import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../../../model/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  saveAdmin(adminObj: EmployeeModel) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) {}

  private apiUrl = '  http://localhost:3000/employee';

  saveAdmin1(obj: EmployeeModel): Observable<any> {
    return this.http.post<any>(this.apiUrl, obj);
  }
}
