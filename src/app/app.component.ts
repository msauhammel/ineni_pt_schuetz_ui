import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {EmployeeService} from './employee.service';
import {MaterialModule} from './material.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    FormsModule,
    RouterOutlet,
    MaterialModule,
    NgIf
  ],
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  employees: any[] = [];
  employee = { id: null, firstName: '', lastName: '', email: '', position: '' };
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'position', 'actions'];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
   this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getAll().subscribe(data => this.employees = data);
  }

  saveEmployee() {
    if (this.employee.id) {
      this.employeeService.update(this.employee).subscribe(() => this.getEmployees());
    } else {
      this.employeeService.create(this.employee).subscribe(() => this.getEmployees());
    }
    this.employee = { id: null, firstName: '', lastName: '', email: '', position: '' };
  }

  editEmployee(emp: any) {
    this.employee = { ...emp };
  }

  deleteEmployee(id: number) {
    this.employeeService.delete(id).subscribe(() => this.getEmployees());
  }
}
