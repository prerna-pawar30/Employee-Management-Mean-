import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = 'http://localhost:3000/api/leave'; 
  constructor(private http:HttpClient) { }

  applyleave(leave: any) {
  
  
    return this.http.post(`${this.apiUrl}/applyleave`, leave);
  }
  
  getAllleave():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
  updateleaveStatus(id:string,status:string):Observable<any>{
    return this.http.put(`${this.apiUrl}/update/${id}`,{status});
  }
}
