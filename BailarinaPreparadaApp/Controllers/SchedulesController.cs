using BailarinaPreparadaApp.DTOs.Schedule;
using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/schedules")]
    [Authorize]
    public class SchedulesController : ControllerBase
    {
        private readonly ScheduleService _scheduleService;

        public SchedulesController(ScheduleService scheduleService)
        {
            _scheduleService = scheduleService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserSchedule(string userId)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var isAdmin = User.IsInRole("admin");

            if (!isAdmin && currentUserId != userId)
            {
                throw new UnauthorizedException("Usuário não autorizado.");
            }

            var schedule = await _scheduleService.GetUserScheduleAsync(userId);

            return Ok(schedule);
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMySchedule()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                throw new UnauthorizedException("Usuário não autenticado.");
            }

            var schedule = await _scheduleService.GetUserScheduleAsync(userId);

            return Ok(schedule);
        }

        [HttpGet("daily")]
        public async Task<IActionResult> GetDailySchedule()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                throw new UnauthorizedException("Usuário não autenticado.");
            }

            var dailySchedule = await _scheduleService.GetDailyScheduleAsync(userId);

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

        [HttpPut("{scheduleId}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateSchedule(int scheduleId, UpdateScheduleRequest request)
        {
            await _scheduleService.UpdateScheduleAsync(scheduleId, request);

            return Ok(new { message = "Planejamento atualizado com sucesso!" });
        }

        [HttpDelete("{scheduleId}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteSchedule(int scheduleId)
        {
            await _scheduleService.DeleteScheduleAsync(scheduleId);

            return Ok(new { message = "Planejamento excluído com sucesso!" });
        }
    }
}
