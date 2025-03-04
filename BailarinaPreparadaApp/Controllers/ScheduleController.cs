using BailarinaPreparadaApp.DTOs.Schedule;
using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class ScheduleController : ControllerBase
    {
        private readonly ScheduleService _scheduleService;

        public ScheduleController(ScheduleService scheduleService)
        {
            _scheduleService = scheduleService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserSchedule(string userId)
        {
            var schedule = await _scheduleService.GetUserScheduleAsync(userId);

            return Ok(schedule);
        }

        [HttpPost("create-schedule")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateSchedule(CreateScheduleRequest request)
        {
            var schedule = await _scheduleService.CreateScheduleAsync(request);

            return CreatedAtAction(nameof(GetUserSchedule), new { userId = request.UserId }, new
            {
                message = "Planejamento criado com sucesso!",
                schedule
            });
        }

        [HttpPut("update-schedule/{scheduleId}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateSchedule(int scheduleId, UpdateScheduleRequest request)
        {
            await _scheduleService.UpdateScheduleAsync(scheduleId, request);

            return Ok(new { message = "Planejamento atualizado com sucesso!" });
        }

        [HttpDelete("delete-schedule/{scheduleId}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteSchedule(int scheduleId)
        {
            await _scheduleService.DeleteScheduleAsync(scheduleId);

            return Ok(new { message = "Planejamento excluído com sucesso!" });
        }
    }
}
