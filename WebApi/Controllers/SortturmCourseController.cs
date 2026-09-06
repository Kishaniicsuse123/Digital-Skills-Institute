using DigitalSkillsInstitute.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;
namespace DigitalSkillsInstitute.Controllers
{

    [Route("api/[Controller]")]
    [ApiController]
    public class SortturmCourseController : Controller
    {
        private readonly AppDbContext _context;
        public SortturmCourseController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult Sortourse()
        {

            var data = _context.ShortTermCourse.Select(c => new ShortTermCourse
            {
                Id = c.Id,
                Coursename = c.Coursename,
                Price = c.Price,
                Sortdescription = c.Sortdescription,
                image = c.image,


            }).ToList();
            return Ok(data);
        }
        

        [HttpGet("GetShortTermCourseDetail/{id}")]
        public IActionResult GetShortTermCourseDetail(int id)
        {
            var feesdetail = _context.ShortTermCourseDetail
                    .FromSqlInterpolated
                    (
                        $"EXEC usp_Web_ShortTermCourseDetail @RecordID = {id}"
                    ).ToList();


            return Ok(feesdetail.FirstOrDefault());
        }
        [HttpGet("GetCourseRegistrationList")]
        public IActionResult GetCourseRegistrationList()
        {
            
            var EnrollmentList = _context.CourseRegistration.FromSqlInterpolated
                (
                    $"EXEC usp_Web_GetCourseRegistrationList"
                ).ToList ();

            return Ok(EnrollmentList);
        }
        [HttpPost("SaveEnquiryDetail")]
        public IActionResult SaveEnquiryDetail([FromBody] Enquiry enquiry)
        {
            try
            {
                var result = _context.Database.ExecuteSqlInterpolated($@"
            EXEC usp_Web_SaveEnquiryDetail
                @ID = {enquiry.ID},
                @Email = {enquiry.Email},
                @CourseName = {enquiry.CourseName},
                @MobileNo = {enquiry.MobileNo}
        ");

                return Ok(new
                {
                    success = true,
                    message = "Enquiry saved successfully."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        [HttpGet("GetEnquiryList")]
        public IActionResult GetEnquiryList()
        {
            
            var EnquiryList = _context.GetEnquiryListDTO.FromSqlInterpolated
                (
                    $"EXEC usp_Web_GetEnquiryList"
                ).ToList();

            return Ok(EnquiryList);
        }
        [HttpGet("GetCourseRegistrationBasicDetail/{RegistrationId}")]
        public IActionResult GetCourseRegistrationBasicDetail(int RegistrationId)
        {

            var EnrollmentList = _context.CourseRegistration.FromSqlInterpolated
                (
                    $"EXEC usp_Web_GetCourseRegistrationBasicDetail @RegistrationId = {RegistrationId}"
                ).ToList();

            return Ok(EnrollmentList);
        }

        [HttpPost("SaveCourseRegistrationDetail")]
        public async Task<IActionResult> SaveCourseRegistrationDetail([FromForm] CourseRegistration registration)
        {
            byte[] imageBytes = null;

            if (registration.ProfilePhoto != null)
            {
                using var ms = new MemoryStream();
                await registration.ProfilePhoto.CopyToAsync(ms);
                imageBytes = ms.ToArray();
            }

            var result = _context.SaveEnquiryResult
                .FromSqlInterpolated($@"
            EXEC usp_Web_SaveCourseRegistrationDetail
                @RegistrationId = {registration.RegistrationId},
                @FullName = {registration.FullName},
                @FatherMotherName = {registration.FatherMotherName},
                @Gender = {registration.Gender},
                @DateOfBirth = {registration.DateOfBirth},
                @MobileNumber = {registration.MobileNumber},
                @AlternateMobileNumber = {registration.AlternateMobileNumber},
                @EmailAddress = {registration.EmailAddress},
                @AddressLine = {registration.AddressLine},
                @City = {registration.City},
                @State = {registration.State},
                @Pincode = {registration.Pincode},

                @CourseName = {registration.CourseName},
                @CourseMode = {registration.CourseMode},
                @CourseDuration = {registration.CourseDuration},
                @BatchTiming = {registration.BatchTiming},
                @PreferredStartDate = {registration.PreferredStartDate},
                @HighestQualification = {registration.HighestQualification},
                @CollegeUniversityName = {registration.CollegeUniversityName},
                @PassingYear = {registration.PassingYear},
                @PercentageCGPA = {registration.PercentageCGPA},
                @ProfilePhoto = {imageBytes}
        ")
                .ToList();

            return Ok(result.FirstOrDefault());
        }


        [HttpDelete("DeleteEmployee/{RegistrationId}")]
        public async Task<IActionResult> DeleteEmployee(int RegistrationId)
        {
            try
            {
                await _context.Database.ExecuteSqlRawAsync(
                    "EXEC usp_Web_DeleteCourseRegistration @RegistrationId = {0}",
                    RegistrationId
                );

                return Ok(new
                {
                    Status = 1,
                    Message = "Employee Deleted Successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    Status = 0,
                    Message = ex.Message
                });
            }
        }
        //public DbSet<PersonalInfo> PersonalInfo { get; set; }
        //public DbSet<EductionDetails> EductionDetails { get; set; }
        //public DbSet<ContactDetail> ContactDetail { get; set; }

        [HttpGet("GetPersonalInfo/{RegistrationId}")]
        public IActionResult GetPersonalInfo(int RegistrationId)
        {

            var PersonalInfoValue = _context.PersonalInfo.FromSqlInterpolated
                (
                    $"EXEC usp_Web_GetPersonalInfo @RegistrationId = {RegistrationId}"
                ).ToList();

            return Ok(PersonalInfoValue);
        }
        [HttpPost("SavePersonalInfo")]
        public async Task<IActionResult> SavePersonalInfo([FromForm] SavePersonalInfoDTO model)
        {
            byte[] imageBytes = null;

          

            if (model.ProfilePhotoFile != null)
            {
                using var ms = new MemoryStream();
                await model.ProfilePhotoFile.CopyToAsync(ms);
                imageBytes = ms.ToArray();
            }

            var result = await _context.Database
            .SqlQueryRaw<ResultModel>(
            @"EXEC usp_Web_SavePersonalInfo
            @RegistrationId = {0},
            @FullName = {1},
            @FatherMotherName = {2},
            @Gender = {3},
            @DateOfBirth = {4},
            @ProfilePhoto = {5}",
                    model.RegistrationId,
                    model.FullName,
                    model.FatherMotherName,
                    model.Gender,
                    model.DateOfBirth,
                    imageBytes)
                .ToListAsync();

            return Ok(result.FirstOrDefault());
        }

        [HttpGet("GetContactDetail/{RegistrationId}")]
        public IActionResult GetContactDetail(int RegistrationId)
        {
            var ContactDetailValue = _context.ContactDetail.FromSqlInterpolated
                (
                $"EXEC usp_Web_GetContactDetail  @RegistrationId = {RegistrationId}"
                ).ToList();
            return Ok(ContactDetailValue);
        }

        [HttpPost("SaveContactDetail")]
        public async Task<IActionResult> SaveContactDetail(ContactDetail model)
        {
            var result = await _context.Database
                .SqlQueryRaw<ResultModel>(
                @"EXEC usp_Web_SaveContactDetail
            @RegistrationId = {0},
            @MobileNumber = {1},
            @AlternateMobileNumber = {2},
            @EmailAddress = {3},
            @AddressLine = {4},
            @City = {5},
            @State = {6},
            @Pincode = {7},
            @Destric = {8}",
                    model.RegistrationId,
                    model.MobileNumber,
                    model.AlternateMobileNumber,
                    model.EmailAddress,
                    model.AddressLine,
                    model.City,
                    model.State,
                    model.Pincode,
                    "")
                .ToListAsync();

            return Ok(result.FirstOrDefault());
        }

        [HttpGet("GetEductionDetails/{RegistrationId}")]
        public IActionResult GetEductionDetails(int RegistrationId)
        {
            var EductionDetailsValue = _context.EductionDetails.FromSqlInterpolated
                (
                $"EXEC usp_Web_GetEductionDetails  @RegistrationId = {RegistrationId}"
                ).ToList();
            return Ok(EductionDetailsValue);
        }

        [HttpPost("SaveEducationDetail")]
        public async Task<IActionResult> SaveEducationDetail(EductionDetails model)
        {
            var result = await _context.Database
                .SqlQueryRaw<ResultModel>(
                @"EXEC usp_Web_SaveEductionDetails
            @RegistrationId = {0},
            @CourseName = {1},
            @CourseMode = {2},
            @CourseDuration = {3},
            @BatchTiming = {4},
            @HighestQualification = {5},
            @CollegeUniversityName = {6},
            @PassingYear = {7},
            @PercentageCGPA = {8}",
                    model.RegistrationId,
                    model.CourseName,
                    model.CourseMode,
                    model.CourseDuration,
                    model.BatchTiming,
                    model.HighestQualification,
                    model.CollegeUniversityName,
                    model.PassingYear,
                    model.PercentageCGPA)
                .ToListAsync();

            return Ok(result.FirstOrDefault());
        }
    }
}




