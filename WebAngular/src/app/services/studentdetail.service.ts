import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PersonalInfo {
  registrationId: number;
  fullName: string;
  fatherMotherName: string;
  gender: string;
  dateOfBirth: string | null;
  profilePhoto: File | null;
}


export interface PersonalInfoSeveDT {
  registrationId: number;
  fullName: string;
  fatherMotherName: string;
  gender: string;
  dateOfBirth: string | null;
  profilePhotoFile: File | null;
}

export interface ContactDetail {
  registrationId: number;
  mobileNumber: string;
  alternateMobileNumber: string;
  emailAddress: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  Distric: string;
}

export interface EducationDetails {
  registrationId: number;
  courseName: string;
  courseMode: string;
  courseDuration: string;
  batchTiming: string;
  preferredStartDate: string | null;
  highestQualification: string;
  collegeUniversityName: string;
  passingYear: number | null;
  percentageCGPA: number | null;
}

export interface ApiResponse {
  registrationId: number;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudentdetailService {

  private PersonalInfoApiUrl = 'http://localhost:5241/api/SortturmCourse/GetPersonalInfo';
  private SavePersonalInfoApiUrl = 'http://localhost:5241/api/SortturmCourse/SavePersonalInfo';

  private GetContactDetailApiUrl = 'http://localhost:5241/api/SortturmCourse/GetContactDetail';
  private SaveContactDetailApiUrl = 'http://localhost:5241/api/SortturmCourse/SaveContactDetail';

  private GetEductionDetailsApiUrl = 'http://localhost:5241/api/SortturmCourse/GetEductionDetails';
  private SaveEducationDetailApiUrl = 'http://localhost:5241/api/SortturmCourse/SaveEducationDetail';


  constructor(private http: HttpClient) { }

  // PersonalInfo Detail

  getPersonalInfo(registrationId: number): Observable<PersonalInfo> {
    return this.http.get<PersonalInfo>(`${this.PersonalInfoApiUrl}/${registrationId}`

    );
  }
 savePersonalInfo(data: FormData): Observable<ApiResponse> {
  return this.http.post<ApiResponse>(
    this.SavePersonalInfoApiUrl,
    data
  );
}

  // Contact Detail

  getContactDetail(registrationId: number): Observable<ContactDetail> {
    return this.http.get<ContactDetail>(
      `${this.GetContactDetailApiUrl}/${registrationId}`
    );
  }

  saveContactDetail(data: ContactDetail): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      this.SaveContactDetailApiUrl,
      data
    );
  }

  // Education Details

  getEducationDetail(registrationId: number): Observable<EducationDetails> {
    return this.http.get<EducationDetails>(
      `${this.GetEductionDetailsApiUrl}/${registrationId}`
    );
  }

  saveEducationDetail(data: EducationDetails): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      this.SaveEducationDetailApiUrl,
      data
    );
  }
}
