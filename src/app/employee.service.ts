import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = '/api/employees'; // Adjust this URL as needed

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  create(emp: any): Observable<any> {
    return this.http.post(this.baseUrl, emp);
  }

  update(emp: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${emp.id}`, emp);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
