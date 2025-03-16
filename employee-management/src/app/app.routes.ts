
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
// import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

import { CheckInOutComponent } from './components/check-in-out/check-in-out.component';

import { RegisterComponent } from './components/register/register.component';
import { authGaurd } from './core/auth-guard';
import { adminGaurd } from './core/admin-guard';

// import { LeaveEmployeeComponent } from './components/leave-employee/leave-employee.component';
// import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';

import { LeaveComponent } from './components/leave-employee/leave-employee.component';


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
        path:'admin-profile',
        component:AdminProfileComponent,
        // canActivate:[adminGaurd]
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

    
];
