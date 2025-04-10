using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/calendars")]
    [Authorize]
    public class CalendarsController : BaseController
    {
        private readonly CalendarService _calendarService;

        public CalendarsController(CalendarService calendarService)
        {
            _calendarService = calendarService;
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetCalendarSummary([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var trainings = await _calendarService.GetCalendarSummaryAsync(CurrentUserId, startDate, endDate);

            if (trainings == null)
            {
                return NotFound(new { message = "Nenhum treino encontrado no período especificado." });
            }

            return Ok(trainings);
        }
    }
}
