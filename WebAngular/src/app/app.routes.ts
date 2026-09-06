import { Routes } from '@angular/router';
import { CardComponent } from "./card/card.component";
import { LongturmCourseComponent } from './longturm-course/longturm-course.component';
import { DegreeInfoComponent } from './degree-info/degree-info.component';
import { SortturmcourseinfoComponent } from './sortturmcourseinfo/sortturmcourseinfo.component';
import { RegistationFormComponent } from './registation-form/registation-form.component';
import { RegistrationlistComponent } from './registrationlist/registrationlist.component';
import { StudentdetailComponent } from './studentdetail/studentdetail.component';

// change 
export const routes: Routes = [

  {
    path: '',
    component: CardComponent
  },

  {
    path: 'longterm-course',
    component: LongturmCourseComponent
  },
  {
    path: 'degree-info/:id',
    component: DegreeInfoComponent
  },
    {
    path: 'sortturmcourse-info/:id',
    component:SortturmcourseinfoComponent
  }
  ,
   {
      path:'Registation',
      component:RegistationFormComponent
  }
  ,
   {
      path:'RegistrationList',
      component:RegistrationlistComponent
  },
   {
      path:'studentdetail/:registrationId',
      component:StudentdetailComponent
  }
];