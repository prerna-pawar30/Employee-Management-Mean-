import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckInOutService {
  private apiUrl = 'http://localhost:3000/checkinout';

  constructor(private http: HttpClient) {}

  getCheckInOutHistory(employeeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/history/${employeeId}`);
  }


  
}
