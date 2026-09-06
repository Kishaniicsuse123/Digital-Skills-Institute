using DigitalSkillsInstitute.Model;
using Microsoft.EntityFrameworkCore;
namespace DigitalSkillsInstitute.Model
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Course> Courses { get; set; }
        public DbSet<DegreeInfo> DegreeInfo { get; set; }
        public DbSet<DgreeinfoDetailsFees> DgreeinfoDetailsFees { get; set; }
        public DbSet<ShortTermCourse> ShortTermCourse { get; set; }
        public DbSet<ShortTermCourseDetail> ShortTermCourseDetail { get; set; }
        public DbSet<Enquiry> Enquiry { get; set; }
        public DbSet<Enquiry> SaveEnquiryResult { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<SaveEnquiryResult>().HasNoKey();
        }
        public DbSet<CourseRegistration> CourseRegistration { get; set; }

        public DbSet<PersonalInfo> PersonalInfo { get; set; }

        public DbSet<SavePersonalInfoDTO> SavePersonalInfoDTO { get; set; }
        
        public DbSet<EductionDetails> EductionDetails { get; set; }
        public DbSet<ContactDetail> ContactDetail { get; set; }

        public DbSet<GetEnquiryListDTO> GetEnquiryListDTO { get; set; }

        
    }

}
