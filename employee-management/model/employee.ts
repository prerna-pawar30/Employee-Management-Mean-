export class EmployeeModel {
  id: string;
  name: string;
  email: string;
  mobNo: number;
  deptName: string;
  password: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.email = '';
    this.mobNo = 0;
    this.deptName = '';
    this.password = '';
  }
}
