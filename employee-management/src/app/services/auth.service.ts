import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment.prod';
import { inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUserId() {
    throw new Error('Method not implemented.');
  }

  constructor() {}
http = inject(HttpClient);

  register(name: string, email: string, password: string, p0: string){
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
    return typeof window !!== "undefined" && localStorage.getItem("token") !== null;
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
  //i am giving manali type it
  getCurrentUser(): { _id: string; name: string; email: string } | null {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (userData) {
        return JSON.parse(userData);
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

  get userId(): string | null {
    if (typeof window !== "undefined") {
      let userData = localStorage.getItem("user");
      if (userData) {
        return JSON.parse(userData)._id; // Make sure the user object contains `_id`
      }
    }
    return null;
  }
  
}