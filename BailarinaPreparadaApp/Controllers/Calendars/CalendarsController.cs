using BailarinaPreparadaApp.Services.Calendars;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers.Calendars
{
    [ApiController]
    [Route("api/v1/calendars")]
    [Authorize]
    public class CalendarsController : BaseController
    {
        private readonly ICalendarService _calendarService;

        public CalendarsController(ICalendarService calendarService)
        {
            _calendarService = calendarService;
        }

        [HttpGet("summary")]
        public async Task<IActionResult> GetCalendarSummary([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var trainings = await _calendarService.GetCalendarSummaryAsync(CurrentUserId, startDate, endDate);

            return Ok(trainings);
        }
    }
}
