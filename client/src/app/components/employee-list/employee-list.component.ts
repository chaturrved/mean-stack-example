import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  template: `
    <h2 class="text-center m-5">Employees List</h2>

    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Level</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let employee of employees$ | async">
          <td>{{employee.name}}</td>
          <td>{{employee.position}}</td>
          <td>{{employee.level}}</td>
          <td>
            <button class="btn btn-primary me-1" [routerLink]="['edit/', employee._id]">Edit</button>
            <button class="btn btn-danger" (click)="deleteEmployee(employee._id || '')">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New Employee</button>
  `,
  styles: [
  ]
})
export class EmployeeListComponent implements OnInit {

  employees$: Observable<Employee[]> = new Observable();

  constructor(private employeeService: EmployeeService){ }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  deleteEmployee(id: string){
    this.employeeService.deleteEmployee(id).subscribe({
      next: ()=>this.fetchEmployees()
    });
  }

  private fetchEmployees(): void{
    this.employees$ = this.employeeService.getEmployees();
  }

}
