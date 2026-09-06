import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SortturmCourseService, sortturmcourseinfo, Enquiry } from '../services/sortturm-course.service';
import { FormsModule } from '@angular/forms';
imports: [CommonModule, RouterModule, FormsModule]

@Component({
  selector: 'app-sortturmcourseinfo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './sortturmcourseinfo.component.html',
  styleUrl: './sortturmcourseinfo.component.css'
})

export class SortturmcourseinfoComponent implements OnInit 
{
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

      constructor(private SortturmCourseService: SortturmCourseService,
                  private route: ActivatedRoute)
                {}

      ngOnInit(): void {
            const id = Number(this.route.snapshot.paramMap.get('id'));

            this.SortturmCourseService.getsortturmcourseinfo(id).subscribe((data: sortturmcourseinfo) => {
                  this.SortturmCourseInfo = data;

            });

            this.intervalId = setInterval(() => {
                  this.currentIndex =
                        (this.currentIndex + 1) % this.images.length;

            }, 1500); // 3 seconds
      }

      // ---Data insert ---------
      saveData() 
      {
            this.SortturmCourseService.saveEnquiry(this.enquiry)
                  .subscribe
                  ({
                        next: (res) => 
                        {
                              console.log('Success:', res);
                              alert('Data Saved Successfully');
                        },
                        error: (err) =>
                        {
                              console.error(err);
                              alert('Error');
                        }
                  });
      }
}