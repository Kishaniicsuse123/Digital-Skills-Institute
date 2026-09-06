import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { StudentdetailService, PersonalInfo, ContactDetail, EducationDetails, PersonalInfoSeveDT } from '../services/studentdetail.service';


@Component({
  selector: 'app-studentdetail',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './studentdetail.component.html',
  styleUrl: './studentdetail.component.css'
})
export class StudentdetailComponent 
{


  registrationId: number = 1;

  personalInfo: PersonalInfo = {
    registrationId: 0,
    fullName: '',
    fatherMotherName: '',
    gender: '',
    dateOfBirth: null,
    profilePhoto: null
  };

  personalInfoSave: PersonalInfoSeveDT = {
  registrationId: 0,
  fullName: '',
  fatherMotherName: '',
  gender: '',
  dateOfBirth: null,
  profilePhotoFile: null
};
  contactDetail: ContactDetail = {
    registrationId: 0,
    mobileNumber: '',
    alternateMobileNumber: '',
    emailAddress: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
    Distric: ''
  };

  educationDetail: EducationDetails = {
    registrationId: 0,
    courseName: '',
    courseMode: '',
    courseDuration: '',
    batchTiming: '',
    preferredStartDate: null,
    highestQualification: '',
    collegeUniversityName: '',
    passingYear: null,
    percentageCGPA: null
  };

  constructor(private registrationService: StudentdetailService, private route: ActivatedRoute) { }
  ngOnInit(): void 
  {
    this.registrationId = Number
    (
      this.route.snapshot.paramMap.get('registrationId')
    );

    console.log('RegistrationId:', this.registrationId);

    this.getPersonalInfo();
    this.getContactDetail();
    this.getEducationDetail();
  }


  // ======================
  // GET METHODS
  // ======================

  getPersonalInfo(): void 
  {
    this.registrationService
      .getPersonalInfo(this.registrationId)
      .subscribe({
        next: (response: any) => 
        {
          this.personalInfo = response[0];
        },
        error: (err) => 
        {
          console.error(err);
        }
      });
    console.log(this.personalInfo.profilePhoto);
  }

  onFileSelected(event: any): void
  {

    if (event.target.files.length > 0) 
      {
        this.personalInfoSave.profilePhotoFile =
        event.target.files[0];
      }
  }

savePersonalInfo(): void {

  // GET object se SAVE object me data copy
  this.personalInfoSave.registrationId =
    this.personalInfo.registrationId;

  this.personalInfoSave.fullName =
    this.personalInfo.fullName;

  this.personalInfoSave.fatherMotherName =
    this.personalInfo.fatherMotherName;

  this.personalInfoSave.gender =
    this.personalInfo.gender;

  this.personalInfoSave.dateOfBirth =
    this.personalInfo.dateOfBirth;

  const formData = new FormData();

  formData.append(
    'RegistrationId',
    this.personalInfoSave.registrationId.toString()
  );

  formData.append(
    'FullName',
    this.personalInfoSave.fullName
  );

  formData.append(
    'FatherMotherName',
    this.personalInfoSave.fatherMotherName
  );

  formData.append(
    'Gender',
    this.personalInfoSave.gender
  );

  formData.append(
    'DateOfBirth',
    this.personalInfoSave.dateOfBirth ?? ''
  );

  if (this.personalInfoSave.profilePhotoFile) {

    formData.append(
      'ProfilePhotoFile',
      this.personalInfoSave.profilePhotoFile
    );

  }

  this.registrationService
    .savePersonalInfo(formData)
    .subscribe({
      next: (response) => {

        console.log(response);

        alert('Personal Info Saved Successfully');

        this.getPersonalInfo();

      },
      error: (err) => {

        console.error(err);

      }
    });
}
isPersonalEditMode = false;

togglePersonalEdit(): void {
  this.isPersonalEditMode = !this.isPersonalEditMode;
}
  getContactDetail(): void {
    this.registrationService
      .getContactDetail(this.registrationId)
      .subscribe({
        next: (response: any) => {
          this.contactDetail = response[0];
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
  getEducationDetail(): void {
    this.registrationService
      .getEducationDetail(this.registrationId)
      .subscribe({
        next: (response: any) => {
          this.educationDetail = response[0];
        },
        error: (err) => {
          console.error(err);
        }
      });
  }


  // SAVE CONTACT DETAIL

  saveContactDetail(): void {

    this.registrationService
      .saveContactDetail(this.contactDetail)
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('Contact Detail Saved Successfully');
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

 // SAVE EDUCATION DETAIL


  saveEducationDetail(): void {
    this.registrationService
      .saveEducationDetail(this.educationDetail)
      .subscribe({
        next: (response) => {
          console.log(response);
          alert('Education Detail Saved Successfully');
        },
        error: (err) => {
          console.error(err);
        }
      });
  }


  // Edit funtionality
  isEditMode = false;
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }


  updateContactDetail() {
    this.registrationService
      .saveContactDetail(this.contactDetail)
      .subscribe({
        next: () => {
          alert('Updated Successfully');
          this.isEditMode = false;
          this.getContactDetail();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
  // Edit Eduction 
  isEducationEditMode = false;
  toggleEducationEdit() {
    this.isEducationEditMode = !this.isEducationEditMode;
  }

  updateEducationDetail() {
    this.registrationService
      .saveEducationDetail(this.educationDetail)
      .subscribe({
        next: () => {
          alert('Education Details Updated Successfully');
          this.isEducationEditMode = false;
          this.getEducationDetail();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}
