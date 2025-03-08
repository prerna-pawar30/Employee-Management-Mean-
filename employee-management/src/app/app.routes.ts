import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
// import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

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
        path:'admin-dashboard',
        component:AdminDashboardComponent,
    },
    {
        path:'employee-dashboard',
        component:EmployeeDashboardComponent,
    },


    {path:'employee-list', component:EmployeeListComponent},

    {path:'add-employee', component:AddEmployeeComponent}
    
];
