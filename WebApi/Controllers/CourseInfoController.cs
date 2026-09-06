using Microsoft.AspNetCore.Mvc;
using DigitalSkillsInstitute.Model;
namespace DigitalSkillsInstitute.Controllers
{

    [Route("api/[Controller]")]
    [ApiController]

    public class CourseinfoController : Controller
    {
        private readonly AppDbContext _context;
        public CourseinfoController(AppDbContext context)
        {
            _context = context;
        }
     
       [HttpGet]
        public IActionResult Courseinfo()
        {
            var data =_context.Courses.Select(c => new Course
            { 
              Id = c.Id,
              Name = c.Name,
              Fees = c.Fees,
              SortDesc = c.SortDesc,
              image=c.image

            }).ToList();
            return Ok(data);

        }
        

    }
}
