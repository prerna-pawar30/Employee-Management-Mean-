import { Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';

// Define Employee Interface
interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  salary: number;
}

@Component({
  selector: 'app-employees',
  standalone: true, // Add standalone to properly load imports in Angular 15+
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  displayedColumns: string[] = ['id', 'name', 'position', 'department', 'salary', 'action'];
  dataSource = new MatTableDataSource<Employee>([
    { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'IT', salary: 75000 },
    { id: 2, name: 'Jane Smith', position: 'HR Manager', department: 'Human Resources', salary: 65000 },
    { id: 3, name: 'Michael Johnson', position: 'Project Manager', department: 'Operations', salary: 90000 },
    { id: 4, name: 'Emily Brown', position: 'Designer', department: 'Creative', salary: 55000 }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(employeeId: number) {
    this.dataSource.data = this.dataSource.data.filter(emp => emp.id !== employeeId);
  }
}
