import { HttpClient } from '@angular/common/http';
import { inject,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}
http = inject(HttpClient);

  register(name:string,email:string,password:string){
    return this.http.post(environment.apiUrl+"/auth/register",{
      name,
      email,
      password,
    });
  }

  login(email:string,password:string){
    return this.http.post(environment.apiUrl+"/auth/login",{
      email,
      password,
    });
  }

  get isLoggedIn(): boolean {
    return typeof window !== "undefined" && localStorage.getItem("token") !== null;
  }
  
  get isAdmin(): boolean {
    if (typeof window !== "undefined") {
      let userData = localStorage.getItem("user");
      if (userData) {
        return JSON.parse(userData).isAdmin;
      }
    }
    return false;
  }
  
  get userName(): string | null {
    if (typeof window !== "undefined") {
      let userData = localStorage.getItem("user");
      if (userData) {
        return JSON.parse(userData).name;
      }
    }
    return null;
  }
  
  get userEmail(): string | null {
    if (typeof window !== "undefined") {
      let userData = localStorage.getItem("user");
      if (userData) {
        return JSON.parse(userData).email;
      }
    }
    return null;
  }
  
  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
}