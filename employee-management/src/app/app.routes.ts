import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

export const routes: Routes = [
    {
        path: '',
        component:AppComponent,
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
