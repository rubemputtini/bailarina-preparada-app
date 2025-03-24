using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Schedule;
using BailarinaPreparadaApp.DTOs.ScheduleTask;
using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services
{
    public class ScheduleService
    {
        private readonly ApplicationDbContext _dbContext;

        public ScheduleService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ScheduleResponse> GetUserScheduleAsync(string userId)
        {
            var user = await _dbContext.Users.FindAsync(userId);

            if (user == null)
            {
                throw new NotFoundException("Usuário não encontrado.");
            }

            var schedule = await _dbContext.Schedules
                .Include(s => s.Entries)
                .Where(s => s.UserId == userId)
                .OrderByDescending(s => s.ScheduleId)
                .FirstOrDefaultAsync();

            if (schedule == null)
            {
                schedule = new Schedule
                {
                    UserId = userId,
                    User = user,
                    Entries = new List<ScheduleTask>()
                };

                _dbContext.Schedules.Add(schedule);
                await _dbContext.SaveChangesAsync();
            }

            var response = new ScheduleResponse
            {
                ScheduleId = schedule.ScheduleId,
                UserId = schedule.UserId,
                UserName = user.Name,
                CreatedAt = schedule.CreatedAt,
                UpdatedAt = schedule.UpdatedAt,
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

            return response;
        }

        public async Task<IEnumerable<ScheduleTaskResponse>> GetDailyScheduleAsync(string userId)
        {
            var currentDayOfWeek = (int)DateTime.UtcNow.DayOfWeek;

            var dailySchedule = await _dbContext.ScheduleTasks
                .Where(e => e.Schedule.UserId == userId && (int)e.DayOfWeek == currentDayOfWeek)
                .Select(e => new ScheduleTaskResponse
                {
                    ScheduleTaskId = e.ScheduleTaskId,
                    DayOfWeek = e.DayOfWeek,
                    Slot = e.Slot,
                    Period = e.Period,
                    Activity = e.Activity,
                    Notes = e.Notes,
                    Color = e.Color
                })
                .OrderBy(e => e.Period == "Manhã" ? 1 : e.Period == "Tarde" ? 2 : e.Period == "Noite" ? 3 : 99)
                .ThenBy(e => e.Slot)
                .ToListAsync();

            if (dailySchedule == null)
            {
                return new List<ScheduleTaskResponse>();
            }

            return dailySchedule;
        }

        public async Task<ScheduleResponse> CreateScheduleAsync(CreateScheduleRequest request)
        {
            var user = await _dbContext.Users.FindAsync(request.UserId);

            if (user == null)
            {
                throw new NotFoundException("Usuário não encontrado.");
            }

            var schedule = new Schedule
            {
                UserId = request.UserId,
                User = user,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
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

            _dbContext.Schedules.Add(schedule);
            await _dbContext.SaveChangesAsync();

            return await GetUserScheduleAsync(request.UserId);
        }

        public async Task UpdateScheduleAsync(int scheduleId, UpdateScheduleRequest request)
        {
            var schedule = await _dbContext.Schedules
                .Include(s => s.Entries)
                .FirstOrDefaultAsync(s => s.ScheduleId == scheduleId);

            if (schedule == null)
            {
                throw new NotFoundException("Planejamento não encontrado.");
            }

            var taskMap = schedule.Entries.ToDictionary(t => t.ScheduleTaskId);

            var incomingTaskIds = request.Tasks
                .Where(t => t.ScheduleTaskId.HasValue && t.ScheduleTaskId.Value > 0)
                .Select(t => t.ScheduleTaskId.Value)
                .ToHashSet();

            var tasksToRemove = schedule.Entries
                .Where(t => !incomingTaskIds.Contains(t.ScheduleTaskId))
                .ToList();

            _dbContext.ScheduleTasks.RemoveRange(tasksToRemove);

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

            schedule.UpdatedAt = DateTime.UtcNow;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteScheduleAsync(int scheduleId)
        {
            var schedule = await _dbContext.Schedules
                .Include(s => s.Entries)
                .FirstOrDefaultAsync(s => s.ScheduleId == scheduleId);

            if (schedule == null)
            {
                throw new NotFoundException("Planejamento não encontrado.");
            }

            if (schedule.Entries.Count > 0)
            {
                _dbContext.ScheduleTasks.RemoveRange(schedule.Entries);
            }

            _dbContext.Schedules.Remove(schedule);
            await _dbContext.SaveChangesAsync();
        }
    }
}
