import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../../services/leave.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
@Component({
  selector: 'app-leave-employee',
  imports: [FormsModule,DatePipe,CommonModule],
  templateUrl: './leave-employee.component.html',
  styleUrl: './leave-employee.component.css'
})
export class LeaveEmployeeComponent implements OnInit{
  leaves:any[] =[];
  newleave ={employeeId: '',reason: '',date:''};
  constructor(private leaveService:LeaveService) {}
  ngOnInit(): void {
    this.getAllleave();
  }

  getAllleave(){
    this.leaveService.applyleave(this.newleave).subscribe(() =>{
      this.getAllleave();
    });
  }
  applyleave(){
    this.leaveService.applyleave(this.newleave).subscribe(()=>{
      this.getAllleave();
    });
  }
  updateleave(id:string,status:string){
    this.leaveService.updateleaveStatus(id,status).subscribe(()=>{
      this.getAllleave();
    }); 
  }
}
