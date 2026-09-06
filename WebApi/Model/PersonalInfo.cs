using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DigitalSkillsInstitute.Model
{
    public class PersonalInfo
    {
        [Key]
        public int RegistrationId { get; set; }
        public string FullName { get; set; }
        public string FatherMotherName { get; set; }
        public string Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        [NotMapped]
        public IFormFile? ProfilePhotoFile { get; set; }

        public byte[]? ProfilePhoto { get; set; }
    }
}
