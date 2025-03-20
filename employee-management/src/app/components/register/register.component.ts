import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

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
  formbuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  registerForm = this.formbuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-zA-Z\s]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), 
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]]
  });

  register() {
    if (this.registerForm.invalid) {
      let errorMessage = '';

      if (this.registerForm.get('name')?.hasError('required')) {
        errorMessage = 'Name is required!';
      } else if (this.registerForm.get('name')?.hasError('minlength')) {
        errorMessage = 'Name must be at least 3 characters long!';
      } else if (this.registerForm.get('name')?.hasError('maxlength')) {
        errorMessage = 'Name must not exceed 20 characters!';
      } else if (this.registerForm.get('name')?.hasError('pattern')) {
        errorMessage = 'Name can only contain letters and spaces!';
      } else if (this.registerForm.get('email')?.hasError('required')) {
        errorMessage = 'Email is required!';
      } else if (this.registerForm.get('email')?.hasError('email')) {
        errorMessage = 'Please enter a valid email!';
      } else if (this.registerForm.get('password')?.hasError('required')) {
        errorMessage = 'Password is required!';
      } else if (this.registerForm.get('password')?.hasError('minlength')) {
        errorMessage = 'Password must be at least 6 characters long!';
      } else if (this.registerForm.get('password')?.hasError('pattern')) {
        errorMessage = 'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character (@$!%*?&)!';
      }

      if (errorMessage) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: errorMessage,
        });
      }
      return;
    }

    let value = this.registerForm.value;
    Swal.fire({
      title: 'Registering...',
      text: 'Please wait while we create your account',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.authService.register(value.name!, value.email!, value.password!)
      .subscribe({
        next: () => {
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: 'You have successfully registered. Please login.',
            timer: 2000,
            showConfirmButton: false
          });
          this.router.navigateByUrl('/login');
        },
        error: (err: { status: number; error: { message: string; }; }) => {
          Swal.close();
          if (err.status === 400 && err.error.message === 'Email already exists') {
            Swal.fire({
              icon: 'warning',
              title: 'Email Already Exists',
              text: 'This email is already registered. Please try logging in or use another email.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Registration Failed',
              text: 'Something went wrong. Please try again later.',
            });
          }
        }
      });
  }
}
