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
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  register() {
    if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please fill out all fields correctly!',
      });
      return;
    }

    let value = this.registerForm.value;
    this.authService.register(value.name!, value.email!, value.password!)
      .subscribe({
        next: () => {
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
