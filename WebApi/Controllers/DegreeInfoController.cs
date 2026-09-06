using Microsoft.AspNetCore.Mvc;
using DigitalSkillsInstitute.Model;
using Microsoft.EntityFrameworkCore;
namespace DigitalSkillsInstitute.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]


    public class DegreeInfoController : Controller
    {
        private readonly AppDbContext _appDbContext;
        public DegreeInfoController(AppDbContext _context)
        {
            _appDbContext= _context;
        }

        [HttpGet("{CourseId}")]
        public ActionResult Degreeinfo(int CourseId)
        {
            var data = _appDbContext.DegreeInfo
                .FromSqlInterpolated(
                    $"EXEC usp_Web_DgreeinfoDetails @RecordID = {CourseId}"
                )
                .ToList();

            //return Ok(data);
            return Ok(data.FirstOrDefault());
        }

        [HttpGet("DgreeinfoDetailsFees/{id}")]
        public IActionResult DgreeinfoDetailsFees(int id)
        {
            var feesdetail = _appDbContext.DgreeinfoDetailsFees
                    .FromSqlInterpolated
                    (
                        $"EXEC usp_Web_DgreeinfoDetailsFees @RecordID = {id}"
                    ).ToList();
            return Ok(feesdetail);
        }


    }
}
