import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
// import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { RegisterComponent } from './components/register/register.component';
import { adminGaurd } from './core/admin-guard';
import { authGaurd } from './core/auth-guard';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';

export const routes: Routes = [
    {
        path: '',
        component:LoginComponent,
    },
    {
        path:'login',
        component:LoginComponent,
    },

    {
        path:'register',
        component:RegisterComponent,
    },
    
    {
        path:'admin-dashboard',
        component:AdminDashboardComponent,
        canActivate:[adminGaurd]
    },
    {
        path:'employee-dashboard',
        component:EmployeeDashboardComponent,
        canActivate:[authGaurd]
    },

    {
        path:'employee-profile',
        component:EmployeeProfileComponent,
        canActivate:[authGaurd]
    },

    {
        path:'employee-list', 
        component:EmployeeListComponent,
        canActivate:[adminGaurd]
    },

    {path:'add-employee', component:AddEmployeeComponent}
    
];
