// import { inject } from "@angular/core";
// import { CanActivateFn, Router } from "@angular/router";
// import { AuthService } from "../services/auth.service";

// export const authRedirectGuard: CanActivateFn = (route, state) => {
//     const authService = inject(AuthService);
//     const router = inject(Router);

//     if (authService.isLoggedIn) {
//         router.navigateByUrl('/employee-dashboard'); // Redirect to the appropriate dashboard
//         return false;
//     }
    
//     return true;
// };
