import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import axios, { AxiosResponse } from 'axios';
import { AuthService } from '../../services/auth.service';

interface AuthResponse {
  token: string;
  role: string;
  message?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  errorMessage: string = '';

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) return;

    try {
      const response: AxiosResponse<AuthResponse> = await this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      );

      console.log('Login response:', response);

      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);

        const redirectPath = response.data.role === 'admin' ? '/admin-dashboard' : '/user-dashboard';
        await this.router.navigate([redirectPath]);
      } else {
        this.errorMessage = 'Invalid response from server';
        console.error('Invalid response structure:', response);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      this.errorMessage = error.response?.data?.error || 'Login failed';
    }
  }
}
