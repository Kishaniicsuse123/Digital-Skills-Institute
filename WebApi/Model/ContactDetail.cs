using System.ComponentModel.DataAnnotations;

namespace DigitalSkillsInstitute.Model
{
    public class ContactDetail
    {
        [Key]
        public int RegistrationId { get; set; }
        public string MobileNumber { get; set; }
        public string AlternateMobileNumber { get; set; }
        public string EmailAddress { get; set; }
        public string AddressLine { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Pincode { get; set; }

    }
}
