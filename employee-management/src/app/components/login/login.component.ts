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
  formbuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  errorMessage: string = '';

  login() {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please enter a valid email and password!',
      });
      return;
    }

    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!)
      .subscribe({
        next: (result: any) => {
          console.log(result);
          localStorage.setItem("token", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));

          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: `Welcome back, ${result.user.name}!`,
            timer: 2000,
            showConfirmButton: false
          });

          if (result.user.isAdmin) {
            this.router.navigateByUrl("/admin-dashboard");
          } else {
            this.router.navigateByUrl("/employee-dashboard");
          }
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid email or password!',
          });
        }
      });
  }
}
