
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';


import { SortturmCourseService, sortturmcourse } from '../services/sortturm-course.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  sortturmcourse: sortturmcourse[] = [];

  constructor(private sortturmCourseService: SortturmCourseService) {

  }

  ngOnInit(): void {
    this.sortturmCourseService.getCoursesData().subscribe((data: sortturmcourse[]) => {
      this.sortturmcourse = data;
    });
  }
}