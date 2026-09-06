namespace DigitalSkillsInstitute.Model
{
    public class ShortTermCourseDetail
    {

        public int Id { get; set; }

        public string CourseName { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public string LongDescription { get; set; } = string.Empty;
        

        public string image { get; set; } = string.Empty;

        public string Duration { get; set; } = string.Empty;

        public string Level { get; set; } = string.Empty;

        public string Language { get; set; } = string.Empty;

        public bool Certificate { get; set; }

        public decimal Rating { get; set; }

        public int Students { get; set; }

        public bool Status { get; set; }


    }
}
