using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs;
using BailarinaPreparadaApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class CalendarController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;

        public CalendarController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("calendar-summary")]
        public async Task<IActionResult> GetCalendarSummary([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {
                var user = await _userManager.GetUserAsync(User);

                if (user == null)
                {
                    return Unauthorized(new { message = "Usuário não autenticado." });
                }

                var trainings = await _context.Trainings
                    .Where(t => t.UserId == user.Id && t.Date >= startDate && t.Date <= endDate)
                    .GroupBy(t => t.Date.Date)
                    .Select(g => new CalendarSummaryResponse
                    {
                        Date = g.Key,
                        TrainingCount = g.Count()
                    })
                    .ToListAsync();

                return Ok(trainings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro ao buscar resumo do calendário.", details = ex.Message });
            }
        }
    }
}
