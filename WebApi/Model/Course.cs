namespace DigitalSkillsInstitute.Model
{
    public class Course
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public decimal? Fees { get; set; }
        public string? SortDesc { get; set; } = null;
        public string? image { get; set; }

    }
}
