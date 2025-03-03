using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs;
using BailarinaPreparadaApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class ScheduleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ScheduleController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserSchedule(string userId)
        {
            var schedule = await _context.Schedules
                .Include(s => s.Entries)
                .Where(s => s.UserId == userId)
                .OrderByDescending(s => s.ScheduleId)
                .FirstOrDefaultAsync();

            if (schedule == null)
            {
                return NotFound(new { message = "Planejamento não encontrado para o usuário."});
            }

            var response = new ScheduleResponse
            {
                ScheduleId = schedule.ScheduleId,
                UserId = schedule.UserId,
                UserName = (await _context.Users.FindAsync(schedule.UserId))?.Name ?? string.Empty,
                Tasks = schedule.Entries.Select(e => new ScheduleTaskResponse
                {
                    ScheduleTaskId = e.ScheduleTaskId,
                    DayOfWeek = e.DayOfWeek,
                    Slot = e.Slot,
                    Period = e.Period,
                    Activity = e.Activity,
                    Notes = e.Notes,
                    Color = e.Color
                }).ToList()
            };

            return Ok(response);
        }

        [HttpPost("create-schedule")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateSchedule(CreateScheduleRequest request)
        {
            var user = await _context.Users.FindAsync(request.UserId);

            if (user == null)
            {
                return BadRequest(new { message = "Usuário não encontrado." });
            }

            try
            {
                var schedule = new Schedule
                {
                    UserId = request.UserId,
                    User = user,
                    Entries = request.Tasks.Select(t => new ScheduleTask
                    {
                        DayOfWeek = t.DayOfWeek,
                        Slot = t.Slot,
                        Period = t.Period,
                        Activity = t.Activity,
                        Notes = t.Notes,
                        Color = t.Color
                    }).ToList()
                };

                _context.Schedules.Add(schedule);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetUserSchedule), new { userId = request.UserId }, schedule);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new { message = "Erro ao salvar o planejamento.", details = ex.InnerException?.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro inesperado ao criar planejamento.", details = ex.Message });
            }
        }

        [HttpPut("update-schedule/{scheduleId}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> UpdateSchedule(int scheduleId, UpdateScheduleRequest request)
        {
            var schedule = await _context.Schedules
                .Include(s => s.Entries)
                .FirstOrDefaultAsync(s => s.ScheduleId == scheduleId);

            if (schedule == null)
            {
                return NotFound(new { message = "Planejamento não encontrado." });
            }

            try
            {
                var taskMap = schedule.Entries.ToDictionary(t => t.ScheduleTaskId);

                foreach (var taskRequest in request.Tasks)
                {
                    if (!taskRequest.ScheduleTaskId.HasValue || taskRequest.ScheduleTaskId == 0)
                    {
                        var newTask = new ScheduleTask
                        {
                            DayOfWeek = taskRequest.DayOfWeek,
                            Slot = taskRequest.Slot,
                            Period = taskRequest.Period,
                            Activity = taskRequest.Activity,
                            Notes = taskRequest.Notes,
                            Color = taskRequest.Color
                        };
                        schedule.Entries.Add(newTask);
                    }
                    else if (taskMap.TryGetValue(taskRequest.ScheduleTaskId.Value, out var existingTask))
                    {
                        existingTask.DayOfWeek = taskRequest.DayOfWeek;
                        existingTask.Slot = taskRequest.Slot;
                        existingTask.Period = taskRequest.Period;
                        existingTask.Activity = taskRequest.Activity;
                        existingTask.Notes = taskRequest.Notes;
                        existingTask.Color = taskRequest.Color;
                    }
                }

                await _context.SaveChangesAsync();

                return Ok(new { message = "Planejamento atualizado com sucesso!" });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new { message = "Erro ao atualizar o planejamento.", details = ex.InnerException?.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro inesperado ao atualizar o planejamento.", details = ex.Message });
            }
        }

        [HttpDelete("delete-schedule/{scheduleId}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteSchedule(int scheduleId)
        {
            var schedule = await _context.Schedules
                .Include(s => s.Entries)
                .FirstOrDefaultAsync(s => s.ScheduleId == scheduleId);

            if (schedule == null)
            {
                return NotFound(new { message = "Planejamento não encontrado." });
            }

            try
            {
                if (schedule.Entries.Any())
                {
                    _context.ScheduleTasks.RemoveRange(schedule.Entries);
                }

                _context.Schedules.Remove(schedule);

                await _context.SaveChangesAsync();
                
                return Ok(new { message = "Planejamento excluído com sucesso!" });
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new { message = "Erro ao excluir o planejamento.", details = ex.InnerException?.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro inesperado ao excluir o planejamento.", details = ex.Message });
            }
        }
    }
}
