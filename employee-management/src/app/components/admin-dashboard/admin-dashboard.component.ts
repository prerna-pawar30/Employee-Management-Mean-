import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
interface Employee {
  _id: string;
  name: string;
  email: string;
  mobileNumber: string;
  project: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true, // ✅ Angular 19 best practice
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule, 
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'] // ✅ Fixed to correct format
})
export class AdminDashboardComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['name', 'email', 'mobileNumber', 'project', 'actions'];

  private authService = inject(AuthService); // ✅ Replaced constructor with inject()
  private router = inject(Router); // ✅ Using inject() for DI

  ngOnInit(): void {
    // Employee fetching logic will be added later
  }

  async logout(): Promise<void> {
    try {
      await this.authService.logout();
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  addNewEmployee(): void {
    
    // Implementation pending
  }

  viewEmployee(id: string): void {
    // Implementation pending
  }
}
