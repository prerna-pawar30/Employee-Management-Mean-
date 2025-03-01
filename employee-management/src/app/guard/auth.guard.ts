// src/app/guards/auth.guard.ts
import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService = inject(AuthService); // ✅ Using `inject()`
  private router = inject(Router); // ✅ Using `inject()`

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');
    return token ? true : this.router.createUrlTree(['/login']); // ✅ Improved type safety
  }
}
