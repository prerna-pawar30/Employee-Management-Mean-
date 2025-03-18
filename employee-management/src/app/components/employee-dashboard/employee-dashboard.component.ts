import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CheckInOutService } from '../../services/check-in-out.service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.prod';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CheckInOutComponent } from "../check-in-out/check-in-out.component";
import { EmployeeleaveComponent } from "../employee-leave-form/employee-leave.component";
import { AddEmployeeComponent } from "../add-employee/add-employee.component";
import { SideBarComponent } from "../side-bar/side-bar.component";


interface WorkRecord {
  date: string;
  checkInTime: Date;
  checkOutTime: Date | null;
  duration: number;
}

@Component({
  selector: 'app-employee-dashboard',
  imports: [CommonModule, RouterLink, FormsModule, SideBarComponent],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {

   employeeId: string | null = null;

 employeeName: any;

  constructor(
    @Inject(AuthService) public authService: AuthService,

    private http: HttpClient
  ) {
   
  }
}