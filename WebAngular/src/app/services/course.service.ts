import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Course {
  id: Number;
  name: string;
  fees: number;
  sortDesc: string;
  image: string;
}

@Injectable
({
  providedIn: 'root'
})
export class CourseService
{
  private apiUrl = 'http://localhost:5241/api/CourseInfo';
  constructor(private http: HttpClient)
  {

  }
  getCourses(): Observable<Course[]>
  {
    return this.http.get<Course[]>(this.apiUrl);
  }
}
