import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

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
        path:'user-dashboard',
        component:UserDashboardComponent,
    },

    {
        path: 'admin/employees/add',
        component:EmployeeFormComponent,
    },

    {
        path: 'admin/employees/:id',
        component:EmployeeFormComponent,
    },

    {path:'employee-list', component:EmployeeListComponent}
    
];
