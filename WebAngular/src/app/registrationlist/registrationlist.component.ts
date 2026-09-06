// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { RouterModule, ActivatedRoute } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { RegistationFormService, CourseRegistrationValue } from '../services/registation-form.service';
// import { SortturmCourseService, sortturmcourseinfo, Enquiry } from '../services/sortturm-course.service';
// imports: [CommonModule, RouterModule, FormsModule]



// @Component({
//   selector: 'app-registrationlist',
//   standalone: true,
//   imports: [CommonModule, RouterModule, FormsModule],
//   templateUrl: './registrationlist.component.html',
//   styleUrl: './registrationlist.component.css'
// })
// export class RegistrationlistComponent implements OnInit 
// {
//     enquiryList: GetEnquiryList[] = [];
//   isLoading = false;


//       SortturmCourseInfo!: sortturmcourseinfo;


//   constructor(private regService: RegistationFormService,private SortturmCourseService: SortturmCourseService) { }
//   registrations: CourseRegistrationValue[] = [];

//   ngOnInit(): void {
//         this.loadEnquiryList();
//     this.regService.getRegistrations().subscribe(res => {
//       this.registrations = res;
//     });
//   }
//     loadEnquiryList(): void {

//     this.isLoading = true;

//     this.enquiryService.getEnquiryList().subscribe({
//       next: (response) => {
//         this.enquiryList = response;
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Error loading enquiries:', error);
//         this.isLoading = false;
//       }
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  RegistationFormService,
  CourseRegistrationValue
} from '../services/registation-form.service';

import {
  SortturmCourseService,
  sortturmcourseinfo,
  GetEnquiryList
} from '../services/sortturm-course.service';

@Component({
  selector: 'app-registrationlist',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './registrationlist.component.html',
  styleUrl: './registrationlist.component.css'
})
export class RegistrationlistComponent implements OnInit {

  registrations: CourseRegistrationValue[] = [];
  enquiryList: GetEnquiryList[] = [];

  isLoading = false;
  totalEnquiries = 0;

  SortturmCourseInfo!: sortturmcourseinfo;

  constructor(
    private regService: RegistationFormService,
    private sortturmCourseService: SortturmCourseService
  ) { }

  ngOnInit(): void {

    this.loadEnquiryList();
    this.loadRegistrations();

  }

  loadRegistrations(): void {

    this.regService.getRegistrations().subscribe({
      next: (res) => {
        this.registrations = res;
      },
      error: (err) => {
        console.error('Registration List Error:', err);
      }
    });

  }

  loadEnquiryList(): void {

    this.isLoading = true;

    this.sortturmCourseService.getEnquiryList().subscribe({
      next: (response) => {

        this.enquiryList = response;
        this.totalEnquiries = response.length;

        this.isLoading = false;
      },
      error: (error) => {

        console.error('Error loading enquiries:', error);

        this.isLoading = false;
      }
    });

  }

  deleteEmployee(employeeId: number): void {

    if (confirm('Are you sure you want to delete this employee?')) {

      this.regService.deleteEmployee(employeeId)
        .subscribe({
          next: (response) => {

            if (response.status == 1) {

              alert('Deleted Successfully');

              // Refresh Registration List
              this.loadRegistrations();

            } else {

              alert('Delete Failed');

            }

          },
          error: (error) => {

            console.error(error);

            alert('Something went wrong');

          }
        });

    }

  }

}