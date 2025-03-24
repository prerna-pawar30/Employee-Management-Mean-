// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import Swal from 'sweetalert2';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-otp-verification',
//   templateUrl: './otp-verification.component.html',
//   styleUrls: ['./otp-verification.component.css'],
//   imports: [FormsModule]
// })
// export class OtpVerificationComponent implements OnInit {
//   email: string = '';
//   otp: string = '';
//   otpExpiryTime: number = 10 * 60; // 10 minutes in seconds
//   interval: any;

//   constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

//   ngOnInit() {
//     this.route.queryParams.subscribe(params => {
//       this.email = params['email'] || '';
//     });

//     this.startOtpCountdown();
//   }

//   startOtpCountdown() {
//     this.interval = setInterval(() => {
//       if (this.otpExpiryTime > 0) {
//         this.otpExpiryTime--;
//       } else {
//         clearInterval(this.interval);
//         Swal.fire('Error', 'Your OTP has expired. Please request a new one.', 'error');
//         this.router.navigate(['/register']); // Redirect to registration for a new OTP
//       }
//     }, 1000);
//   }

//   verifyOTP() {
//     if (this.otpExpiryTime <= 0) {
//       Swal.fire('Error', 'Your OTP has expired. Please request a new one.', 'error');
//       return;
//     }

//     this.authService.verifyOtp(this.email, this.otp).subscribe(
//       (res: any) => {
//         clearInterval(this.interval);
//         Swal.fire({
//           title: 'Success!',
//           text: `OTP Verified Successfully. Registration Complete!\nRedirecting to login in 5 seconds...`,
//           icon: 'success',
//           timer: 5000,
//           showConfirmButton: false
//         });
//         setTimeout(() => {
//           this.router.navigate(['/login']);
//         }, 5000);
//       },
//       (error) => {
//         Swal.fire('Error', error.error?.message || 'Invalid OTP. Please try again.', 'error');
//       }
//     );
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
  imports: [FormsModule]
})
export class OtpVerificationComponent implements OnInit {
  email: string = '';
  otp: string = '';
  otpExpiryTime: number = 10 * 60; // 10 minutes in seconds
  interval: any;
  timeLeft: string = '10:00'; // Display countdown time

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });

    this.startOtpCountdown();
  }

  startOtpCountdown() {
    this.updateTimeDisplay();
    this.interval = setInterval(() => {
      if (this.otpExpiryTime > 0) {
        this.otpExpiryTime--;
        this.updateTimeDisplay();
      } else {
        clearInterval(this.interval);
        Swal.fire('Error', 'Your OTP has expired. Please request a new one.', 'error');
        this.router.navigate(['/register']); // Redirect to registration for a new OTP
      }
    }, 1000);
  }

  updateTimeDisplay() {
    const minutes = Math.floor(this.otpExpiryTime / 60);
    const seconds = this.otpExpiryTime % 60;
    this.timeLeft = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  verifyOTP() {
    if (this.otpExpiryTime <= 0) {
      Swal.fire('Error', 'Your OTP has expired. Please request a new one.', 'error');
      return;
    }

    this.authService.verifyOtp(this.email, this.otp).subscribe(
      (res: any) => {
        clearInterval(this.interval);
        Swal.fire({
          title: 'Success!',
          text: `OTP Verified Successfully. Registration Complete!\nRedirecting to login in 5 seconds...`,
          icon: 'success',
          timer: 5000,
          showConfirmButton: false
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 5000);
      },
      (error) => {
        Swal.fire('Error', error.error?.message || 'Invalid OTP. Please try again.', 'error');
      }
    );
  }
}
