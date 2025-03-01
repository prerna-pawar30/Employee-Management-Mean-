import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage: string = '';

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) return;

    try {
      const response = await this.authService.createUser(
        this.registerForm.value.email,
        this.registerForm.value.password,
        'user' // Default role
      );

      console.log('Registration response:', response);

      if (response.data) {
        await this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      this.errorMessage = error.response?.data?.error || 'Registration failed';
    }
  }
}
