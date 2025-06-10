using BailarinaPreparadaApp.DTOs.Schedules;
using BailarinaPreparadaApp.Helpers;
using BailarinaPreparadaApp.Services.Schedules;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers.Schedules
{
    [ApiController]
    [Route("api/v1/schedules")]
    [Authorize]
    public class SchedulesController : BaseController
    {
        private readonly ScheduleService _scheduleService;

        public SchedulesController(ScheduleService scheduleService)
        {
            _scheduleService = scheduleService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserSchedule(string userId)
        {
            PermissionHelper.CheckUserPermission(userId, CurrentUserId, IsAdmin);

            var schedule = await _scheduleService.GetUserScheduleAsync(userId);

            return Ok(schedule);
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMySchedule()
        {
            var schedule = await _scheduleService.GetUserScheduleAsync(CurrentUserId);

            return Ok(schedule);
        }

        [HttpGet("daily")]
        public async Task<IActionResult> GetDailySchedule()
        {
            var dailySchedule = await _scheduleService.GetDailyScheduleAsync(CurrentUserId);

            return Ok(dailySchedule);
        }

        [HttpPost]
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

        [HttpPost("{userId}/send-schedule-email")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> SendScheduleEmail(string userId)
        {
            await _scheduleService.SendScheduleReadyEmailAsync(userId);

            return Ok(new { message = "E-mail de planejamento enviado com sucesso!" });
        }

        [HttpPut("{scheduleId:int}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateSchedule(int scheduleId, UpdateScheduleRequest request)
        {
            await _scheduleService.UpdateScheduleAsync(scheduleId, request);

            return Ok(new { message = "Planejamento atualizado com sucesso!" });
        }

        [HttpDelete("{scheduleId:int}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteSchedule(int scheduleId)
        {
            await _scheduleService.DeleteScheduleAsync(scheduleId);

            return Ok(new { message = "Planejamento excluído com sucesso!" });
        }
    }
}
