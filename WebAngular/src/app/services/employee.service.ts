import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://localhost:7045/api/Employee';

  constructor(private http: HttpClient) { }

  login(model: any): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/Login`,
      model
    );
  }
}
