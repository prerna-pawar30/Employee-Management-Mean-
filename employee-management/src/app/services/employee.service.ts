import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }

  http=inject(HttpClient);

  getAllProducts(){
    return this.http.get<Employee[]>(environment.apiUrl+'/employee');
  }

  getProductbyId(id:string){
    return this.http.get<Employee>(environment.apiUrl+'/employee/' + id);
  }

  addProduct(model:Employee){
    return this.http.post(environment.apiUrl +'/employee',model);
  }

  updateProduct(id:string,model:Employee){
    return this.http.put(environment.apiUrl +'/employee/'+id,model);
  }

  deleteProduct(id:string){
    return this.http.delete(environment.apiUrl +'/employee/'+id);
  }
}
