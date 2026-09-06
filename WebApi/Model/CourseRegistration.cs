
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace DigitalSkillsInstitute.Model
{
    public class CourseRegistration
    {
        [Key]
      
        public int RegistrationId { get; set; }
        public string FullName { get; set; }
        public string FatherMotherName { get; set; }
        public string Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        [NotMapped]
        public IFormFile ProfilePhoto { get; set; }

        public string MobileNumber { get; set; }
        public string AlternateMobileNumber { get; set; }
        public string EmailAddress { get; set; }
        public string AddressLine { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Pincode { get; set; }

        public string CourseName { get; set; }
        public string CourseMode { get; set; }
        public string CourseDuration { get; set; }
        public string BatchTiming { get; set; }
        public DateTime? PreferredStartDate { get; set; }

        public string HighestQualification { get; set; }
        public string CollegeUniversityName { get; set; }
        public int? PassingYear { get; set; }
        public decimal? PercentageCGPA { get; set; }
    }
}

