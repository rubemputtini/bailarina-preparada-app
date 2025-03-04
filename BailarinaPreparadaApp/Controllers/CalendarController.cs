using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class CalendarController : ControllerBase
    {
        private readonly CalendarService _calendarService;

        public CalendarController(CalendarService calendarService)
        {
            _calendarService = calendarService;
        }

        [HttpGet("calendar-summary")]
        public async Task<IActionResult> GetCalendarSummary([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized(new { message = "Usuário não autenticado." });
            }

            var trainings = await _calendarService.GetCalendarSummaryAsync(userId, startDate, endDate);

            if (trainings == null)
            {
                return NotFound(new { message = "Nenhum treino encontrado no período especificado." });
            }

            return Ok(trainings);
        }
    }
}
