// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment.prod';
// import { inject, Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor() {}

//   http = inject(HttpClient);

//   register(name: string, email: string, password: string) {
//     return this.http.post(environment.apiUrl + "/auth/register", {
//       name,
//       email,
//       password,
//     });
//   }

//   login(email: string, password: string) {
//     return this.http.post(environment.apiUrl + "/auth/login", {
//       email,
//       password,
//     });
//   }

//   forgotPassword(email: string) {
//     return this.http.post(environment.apiUrl + "/auth/forgot-password", { email });
//   }

//   verifyOtp(email: string, otp: string) {
//     return this.http.post(environment.apiUrl + "/auth/verify-otp", { email, otp });
//   }

//   resetPassword(token: string, newPassword: string) {
//     return this.http.post(environment.apiUrl + "/auth/reset-password", { token, newPassword });
//   }

//   get isLoggedIn(): boolean {
//     return typeof window !== "undefined" && localStorage.getItem("token") !== null;
//   }

//   get isAdmin(): boolean {
//     if (typeof window !== "undefined") {
//       let userData = localStorage.getItem("user");
//       if (userData) {
//         return JSON.parse(userData).isAdmin;
//       }
//     }
//     return false;
//   }

//   get userName(): string | null {
//     if (typeof window !== "undefined") {
//       let userData = localStorage.getItem("user");
//       if (userData) {
//         return JSON.parse(userData).name;
//       }
//     }
//     return null;
//   }

//   get userEmail(): string | null {
//     if (typeof window !== "undefined") {
//       let userData = localStorage.getItem("user");
//       if (userData) {
//         return JSON.parse(userData).email;
//       }
//     }
//     return null;
//   }

//   getCurrentUser(): { _id: string; name: string; email: string } | null {
//     if (typeof window !== "undefined") {
//       const userData = localStorage.getItem("user");
//       if (userData) {
//         return JSON.parse(userData);
//       }
//     }
//     return null;
//   }

//   logout() {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     }
//   }

//   get userId(): string | null {
//     if (typeof window !== "undefined") {
//       let userData = localStorage.getItem("user");
//       if (userData) {
//         return JSON.parse(userData)._id;
//       }
//     }
//     return null;
//   }

//   // Add this method if you prefer using getUserId() instead of userId
//   getUserId(): string | null {
//     return this.userId;
//   }
// }


import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  http = inject(HttpClient);

  register(name: string, email: string, mobile: string, password: string) {
    return this.http.post(environment.apiUrl + "/auth/register", {
      name,
      email,
      mobile,
      password,
    });
  }

  login(email: string, password: string) {
    return this.http.post(environment.apiUrl + "/auth/login", {
      email,
      password,
    });
  }

  forgotPassword(email: string) {
    return this.http.post(environment.apiUrl + "/auth/forgot-password", { email });
  }

  verifyOtp(email: string, otp: string) {
    return this.http.post(environment.apiUrl + "/auth/verify-otp", { email, otp });
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post(environment.apiUrl + "/auth/reset-password", { token, newPassword });
  }

  get isLoggedIn(): boolean {
    return typeof window !== "undefined" && localStorage.getItem("token") !== null;
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

  getCurrentUser(): { _id: string; name: string; email: string; mobile: string } | null {
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
        return JSON.parse(userData)._id;
      }
    }
    return null;
  }

  getUserId(): string | null {
    return this.userId;
  }
}

