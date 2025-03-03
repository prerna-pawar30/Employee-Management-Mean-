import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component:AppComponent,
    },
    {
        path:'login',
        component:LoginComponent,
    },
    {
        path:'employees',
        component:EmployeesComponent,
    },
    {
        path:'admin-dashboard',
        component:AdminDashboardComponent,
    },
    {
        path:'user-dashboard',
        component:UserDashboardComponent,
    },
    {
        path: 'admin/employees',
        component:EmployeesComponent,
    },

    {
        path: 'admin/employees/add',
        component:EmployeeFormComponent,
    },

    {
        path: 'admin/employees/:id',
        component:EmployeeFormComponent,
    },
    
];
