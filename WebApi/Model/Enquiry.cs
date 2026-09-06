using System.ComponentModel.DataAnnotations;

namespace DigitalSkillsInstitute.Model
{
    public class Enquiry
    {
        [Key]
        public int ID { get; set; }
        public string Email { get; set; }
        public string CourseName { get; set; }
        public string MobileNo { get; set; }

    }
}
