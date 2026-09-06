  
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService, Course } from '../services/course.service';

@Component
  ({
    selector: 'app-longturm-course',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './longturm-course.component.html',
    styleUrl: './longturm-course.component.css'
  })
export class LongturmCourseComponent implements OnInit {
  courses: Course[] = [];
  constructor(private courseService: CourseService) { }
  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data: Course[]) => {
      this.courses = data;
    });
  }
}




