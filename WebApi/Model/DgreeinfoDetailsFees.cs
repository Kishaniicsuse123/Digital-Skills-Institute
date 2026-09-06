using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

[Keyless]
public class DgreeinfoDetailsFees
{
    public string SemesterName { get; set; }

    public decimal SemesterFees { get; set; }
}