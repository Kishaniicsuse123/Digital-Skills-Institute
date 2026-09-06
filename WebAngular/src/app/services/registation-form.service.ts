import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CourseRegistrationValue 
{
  registrationId: number;
  fullName: string;
  fatherMotherName: string;
  gender: string;
  dateOfBirth: string;
  mobileNumber: string;
  alternateMobileNumber: string;
  emailAddress: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  courseName: string;
  courseMode: string;
  courseDuration: string;
  batchTiming: string;
  preferredStartDate: string;
  highestQualification: string;
  collegeUniversityName: string;
  passingYear: number;
  percentageCGPA: number;
}

@Injectable({
  providedIn: 'root'
})

export class RegistationFormService 
{
  private apiUrl ='http://localhost:5241/api/SortturmCourse/SaveCourseRegistrationDetail';
  private getapiUrl ='http://localhost:5241/api/SortturmCourse/GetCourseRegistrationList';
  private getDetailDataApiUrl ='http://localhost:5241/api/SortturmCourse/GetCourseRegistrationBasicDetail';
  private DeleteEmployeeApiUrl ='http://localhost:5241/api/SortturmCourse/DeleteEmployee';
  constructor(private http: HttpClient) { }

  saveRegistration(data: any): Observable<any> 
  {

    const formData = new FormData();

    Object.keys(data).forEach(key => {

      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }

    });

    return this.http.post(this.apiUrl, formData);
  }
  
  getRegistrations(): Observable<CourseRegistrationValue[]>
  {
      return this.http.get<CourseRegistrationValue[]>(this.getapiUrl);
  }
  
  getStudentRegistrationsDetail(RegistrationId: number): Observable<CourseRegistrationValue[]>
  {
      return this.http.get<CourseRegistrationValue[]>(`${this.getDetailDataApiUrl}/${RegistrationId }`);
  }

  
   deleteEmployee(employeeId: number)
   {
      return this.http.delete<any>( `${this.DeleteEmployeeApiUrl}/${employeeId}`);
   }

}