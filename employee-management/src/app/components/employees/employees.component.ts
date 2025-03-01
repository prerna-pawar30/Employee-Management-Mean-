import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-employees',
  imports: [MatFormFieldModule,
    MatInputModule,
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    RouterModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  applyFilter(event:Event){
    
  }

  delete(id: string){
    
  }
}
