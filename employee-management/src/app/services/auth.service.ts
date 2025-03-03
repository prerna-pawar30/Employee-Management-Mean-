import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import axios, { AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode'; // ✅ Updated import

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async login(email: string, password: string): Promise<AxiosResponse<any>> {  // ✅ Updated type
    return axios.post(`${this.baseUrl}/login`, { email, password });
  }

  async createUser(email: string, password: string, role: string): Promise<AxiosResponse<any>> {  // ✅ Updated type
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return axios.post(
        `${this.baseUrl}/create-user`, 
        { email, password, role },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    }
    throw new Error('localStorage is not available in SSR mode');
  }

  isAdmin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode<{ role: string }>(token); // ✅ Improved typing
          return decoded.role === 'admin';
        } catch (error) {
          return false;
        }
      }
    }
    return false;
  }

  async logout(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}
