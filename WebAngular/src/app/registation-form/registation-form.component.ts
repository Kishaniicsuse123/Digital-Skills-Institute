// import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   // BUG FIX
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegistationFormService, CourseRegistrationValue } from '../services/registation-form.service';

@Component({
  selector: 'app-registation-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './registation-form.component.html',
  styleUrl: './registation-form.component.css'
})
export class RegistationFormComponent {
  registration: any = {
    fullName: '',
    fatherMotherName: '',
    gender: '',
    dateOfBirth: '',

    mobileNumber: '',
    alternateMobileNumber: '',
    emailAddress: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',

    courseName: '',
    courseMode: '',
    courseDuration: '',
    batchTiming: '',
    preferredStartDate: '',

    highestQualification: '',
    collegeUniversityName: '',
    passingYear: null,
    percentageCGPA: null
  };

  currentStep:number = 1
  constructor(private regService: RegistationFormService) { }

  selectedFile!: File;

  onFileSelected(event: any) 
  {

    if (event.target.files.length > 0) 
        {
          this.selectedFile = event.target.files[0];
          this.registration.profilePhoto = this.selectedFile;
        }
  }
  SaveRecord() 
  {
    console.log(this.registration);
    
    this.regService
            .saveRegistration(this.registration)
            .subscribe(
              {
                  next: (res) => {
                                  console.log(res);
                                  alert("Saved Successfully");
                                  },
              
                  error: (err) => {

                    console.log(err);

                    alert("Save Failed");
                  }
              });
  }
  nextStep() 
  {
    if (this.currentStep < 4)
       {
          this.currentStep++;
       }
  }

  previousStep() 
  {
    if (this.currentStep > 1)
       {
          this.currentStep--;
       }
  }
}
