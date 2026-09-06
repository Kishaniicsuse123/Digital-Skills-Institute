import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface sortturmcourse {
  id: number,
  Coursename: string,
  price: number,
  sortdescription: string,
  image: string
}
export interface sortturmcourseinfo {
  id: number;
  courseName: string;
  price: number;
  longDescription: string;
  // sortdescription: string;
  image: string;
  duration: string;
  level: string;
  language: string;
  certificate: boolean;
  rating: number;
  students: number;
  ategory: string;
  status: boolean;
}
export interface Enquiry {
  id: number,
  email: string,
  courseName: string,
  mobileNo: string
}
export interface GetEnquiryList {
  id: number;
  email: string;
  courseName: string;
  mobileNo: string;
  createdDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class SortturmCourseService {
  private apiUrl = 'http://localhost:5241/api/SortturmCourse';
    private GetapiUrl = 'http://localhost:5241/api/SortturmCourse/GetEnquiryList';
  constructor(private http: HttpClient) {

  }
  getCoursesData(): Observable<sortturmcourse[]> {
    return this.http.get<sortturmcourse[]>(this.apiUrl);
  }

  getsortturmcourseinfo(id: Number): Observable<sortturmcourseinfo> {
    return this.http.get<sortturmcourseinfo>(`${this.apiUrl}/GetShortTermCourseDetail/${id}`);
  }

  saveEnquiry(data: Enquiry): Observable<any> {
    return this.http.post
      (
        `${this.apiUrl}/SaveEnquiryDetail`, data
      );
  }
  
  getEnquiryList(): Observable<GetEnquiryList[]> 
  {
    return this.http.get<GetEnquiryList[]>(this.GetapiUrl);
  }

}
