using System.ComponentModel.DataAnnotations;

namespace DigitalSkillsInstitute.Model
{
    public class GetEnquiryListDTO
    {
        public int ID { get; set; }

        public string Email { get; set; } = string.Empty;

        public string CourseName { get; set; } = string.Empty;

        public string MobileNo { get; set; } = string.Empty;

        public DateTime CreatedDate { get; set; }

    }
}
