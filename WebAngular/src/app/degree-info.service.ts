import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DegreeInfo {
  Id: number;
  name: string;
  image: string;
  duration: string;
  fees: number;
  eligibility: string;
  mode: string;
  language: string;
  certification: boolean;
  placementSupport: boolean;
  internship: boolean;
  level: string;
  rating: number;
  students: number;
  description: string;
  totalSemester: number;
}
export interface SemesterFees {
  semesterName: string;
  semesterFees: number;
}

@Injectable({
  providedIn: 'root'
})
export class DegreeInfoService {
  private apiUrl = 'http://localhost:5241/api/DegreeInfo';

  constructor(private http: HttpClient) {

  }
  getSemesterFees(id: number): Observable<SemesterFees[]> {
    return this.http.get<SemesterFees[]>

      (`${this.apiUrl}/DgreeinfoDetailsFees/${id}`);
  }
  /* FIXED: 
     DegreeInfo[] hata kar DegreeInfo kiya
  */
  getDegreeInfo(id: number): Observable<DegreeInfo> {
    return this.http.get<DegreeInfo>(`${this.apiUrl}/${id}`);
  }
}