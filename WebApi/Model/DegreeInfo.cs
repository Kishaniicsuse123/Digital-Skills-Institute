using System.ComponentModel.DataAnnotations;

namespace DigitalSkillsInstitute.Model
{
    public class DegreeInfo
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }

        public string? Image { get; set; }

        public string? Duration { get; set; }

        public decimal Fees { get; set; }

        public string? Eligibility { get; set; }

        public string? Mode { get; set; }

        public string? Language { get; set; }

        public bool Certification { get; set; }

        public bool PlacementSupport { get; set; }

        public bool Internship { get; set; }

        public string? Level { get; set; }

        public decimal Rating { get; set; }

        public int Students { get; set; }
        public string Description { get; set; }
        public int? TotalSemester { get; set;}
    }
}
