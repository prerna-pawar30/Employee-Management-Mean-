import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { CheckInOutComponent } from './components/check-in-out/check-in-out.component';
import { RegisterComponent } from './components/register/register.component';
import { authGaurd } from './core/auth-guard';
import { adminGaurd } from './core/admin-guard';
import { EmployeeleaveComponent } from './components/employee-leave-form/employee-leave.component';
import { LeaveComponent } from './components/leave-employee-admin/leave-employee.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
<<<<<<< HEAD
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { EmpProfileComponent } from './components/emp-profile/emp-profile.component';
=======
import { PayrollComponent } from './components/payroll/payroll.component';
>>>>>>> 53457ad54c2bc749d51d00a20466a58e451bbb6f

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
        path:'admin-profile',
        component:AdminProfileComponent,
        canActivate:[adminGaurd],
    },

    {
        path:'emp-profile',
        component:EmpProfileComponent,
        canActivate:[authGaurd],
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
        path:'employee-list', 
        component:EmployeeListComponent,
        canActivate:[adminGaurd]
    },


    {
        path:'add-employee',
        component:AddEmployeeComponent,
    
    },

    {
        path:'checkIn', 
        component:CheckInOutComponent,
        
    },
    
    {
       path:'leave-employee',
       component:LeaveComponent,
       canActivate: [authGaurd]
    },
    {
        path:'employee-leave-form',
        component:EmployeeleaveComponent,
    },

    {
        path:'side-bar', 
        component:SideBarComponent
    },
    { path: 'payroll', component: PayrollComponent },
    
];

