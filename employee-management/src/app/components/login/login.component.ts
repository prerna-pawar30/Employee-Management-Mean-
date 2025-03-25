// import { HttpClient } from '@angular/common/http';
// import { Component, inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import Swal from 'sweetalert2';
// import { AuthService } from '../../services/auth.service';
// // import { NavbarLogoutComponent } from "../navbar-logout/navbar-logout.component";

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   userobj: any = { email: '', password: '' };
//   router = inject(Router);
//   http = inject(HttpClient);

//   constructor() {}

//   authService = inject(AuthService);

//   onLogin() {
//     Swal.fire({
//       title: 'Logging in...',
//       text: 'Please wait while we verify your credentials',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       }
//     });
  
//     console.log('Sending login request with:', this.userobj); // Debugging log
  
//     this.authService.login(this.userobj.email, this.userobj.password).subscribe(
//       (res: any) => {
//         Swal.close();
//         console.log(res, "response obj");
  
//         localStorage.setItem('authToken', res.token);
//         localStorage.setItem('loginUser', JSON.stringify(res.user)); // Store user details
  
//         Swal.fire({
//           title: 'Login Successful!',
//           text: res.message,
//           icon: 'success',
//           timer: 4000,
//           showConfirmButton: false
//         });
  
//         this.router.navigateByUrl("/");
//       },
//       (error) => {
//         Swal.close();
//         console.error('Login failed:', error); // Debugging log
//         Swal.fire({
//           title: 'Login Failed',
//           text: error.error?.message || 'Server error',
//           icon: 'error',
//           confirmButtonText: 'Try Again'
//         });
//       }
//     );
//   }
// }  



import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
// import { NavbarLogoutComponent } from "../navbar-logout/navbar-logout.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userobj: any = { email: '', password: '' };
  router = inject(Router);
  http = inject(HttpClient);

  constructor() {}

  authService = inject(AuthService);

  onLogin() {
    Swal.fire({
      title: 'Logging in...',
      text: 'Please wait while we verify your credentials',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    this.authService.login(this.userobj.email, this.userobj.password).subscribe(
      (res: any) => {
        Swal.close();
        console.log("Login Response:", res);
  
        // Store user details in local storage
        localStorage.setItem('authToken', res.token);
        localStorage.setItem('loginUser', JSON.stringify(res.user));
  
        Swal.fire({
          title: 'Login Successful!',
          text: res.message,
          icon: 'success',
          timer: 4000,
          showConfirmButton: false
        });
  
        // Redirect Based on Role
        if (res.user.role === 'admin') {
          this.router.navigateByUrl("/admin-dashboard");
        } else if (res.user.role === 'employee') {
          this.router.navigateByUrl("/employee-dashboard");
        } else {
          this.router.navigateByUrl("/"); // Default route
        }
      },
      (error) => {
        Swal.close();
        console.error('Login failed:', error);
        Swal.fire({
          title: 'Login Failed',
          text: error.error?.message || 'Server error',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    );
  }
}  