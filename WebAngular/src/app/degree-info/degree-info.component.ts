import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DegreeInfoService, DegreeInfo,SemesterFees} from '../degree-info.service';
import {SortturmCourseService, sortturmcourseinfo, Enquiry } from '../services/sortturm-course.service';

@Component({
  selector: 'app-degree-info',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './degree-info.component.html',
  styleUrl: './degree-info.component.css'
})
export class DegreeInfoComponent implements OnInit, OnDestroy {

  SortturmCourseInfo!: sortturmcourseinfo;

  images: string[] = [
    'CourseSlider/java.png',
    'CourseSlider/digital-marketing.jpg',
    'CourseSlider/msoffice.jpg',
    'CourseSlider/data-science.jpg'
  ];

  currentIndex = 0;
  private intervalId: any;

  enquiry: Enquiry = {
    id: 0,
    email: '',
    courseName: '',
    mobileNo: ''
  };

  DegreeInfo!: DegreeInfo;

  semesterFeesData: SemesterFees[] = [];

  constructor(
    private degreeInfoService: DegreeInfoService,
    private sortturmCourseService: SortturmCourseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    console.log('Course Id:', id);

    // Degree Info API
    this.degreeInfoService.getDegreeInfo(id)
      .subscribe({
        next: (data: DegreeInfo) => {
          this.DegreeInfo = data;
          console.log('Degree Info:', data);
        },
        error: (err) => {
          console.error('Degree Info Error:', err);
        }
      });

    // Semester Fees API
    this.degreeInfoService.getSemesterFees(id)
      .subscribe({
        next: (res: SemesterFees[]) => {
          this.semesterFeesData = res;
          console.log('Semester Fees:', res);
        },
        error: (err) => {
          console.error('Semester Fees Error:', err);
        }
      });

    // Image Slider
    this.intervalId = setInterval(() => {
      this.currentIndex =
        (this.currentIndex + 1) % this.images.length;
    }, 1500);
  }

  saveData(): void {

    this.sortturmCourseService.saveEnquiry(this.enquiry)
      .subscribe({
        next: (res) => {
          console.log('Success:', res);
          alert('Data Saved Successfully');

          // Optional: Clear Form
          this.enquiry = {
            id: 0,
            email: '',
            courseName: '',
            mobileNo: ''
          };
        },
        error: (err) => {
          console.error('Save Error:', err);
          alert('Error while saving data');
        }
      });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}