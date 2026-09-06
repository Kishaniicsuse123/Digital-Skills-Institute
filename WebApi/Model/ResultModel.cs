
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace DigitalSkillsInstitute.Model
{
    public class ResultModel
    {
        [Key]
        public int RegistrationId { get; set; }

        public int Status { get; set; }
    }
}
