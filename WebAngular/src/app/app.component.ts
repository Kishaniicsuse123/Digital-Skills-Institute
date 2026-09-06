
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { LongturmCourseComponent } from "./longturm-course/longturm-course.component";
import { CardComponent } from "./card/card.component";
import { DegreeInfoComponent } from './degree-info/degree-info.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, HeaderComponent, CardComponent, LongturmCourseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent 
{
  selectedFeature = 'Course';
  onFeatureSelected(feature: string) 
  {
      this.selectedFeature = feature;
  }
}