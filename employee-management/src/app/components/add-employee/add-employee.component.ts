import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeModel } from '../../../../model/employee';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-employee',
  imports:[FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  
  adminObj : EmployeeModel = new EmployeeModel();

  constructor(private employeeService: EmployeeService,private router: Router) {}

  onSaveAdmin(): void {
    this.employeeService.saveAdmin1(this.adminObj).subscribe(
      (result: any) => {
        if (result.result) {
          alert('Admin Details Saved Successfully');
        } else {
          alert(result.message);
        }
        
      },
      (error) => {
        console.error('Error admin Saved', error);
        alert('Failed to admin..');
      }
    );
  }
  

}
