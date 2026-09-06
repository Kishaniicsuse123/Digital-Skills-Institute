using System.ComponentModel.DataAnnotations;

namespace DigitalSkillsInstitute.Model
{
    public class EductionDetails
    {
        [Key]
        public int RegistrationId { get; set; }
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
