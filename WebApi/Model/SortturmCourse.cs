using DigitalSkillsInstitute.Model;

namespace DigitalSkillsInstitute.Model
{
    public class ShortTermCourse
    {

        public int? Id { get; set; }
        public string? Coursename { get; set; }
        public decimal? Price { get; set; }
        public string? Sortdescription { get; set; } = null;
        public string? image { get; set; }


    }
}
