using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Schedules;
using BailarinaPreparadaApp.DTOs.ScheduleTasks;
using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Helpers;
using BailarinaPreparadaApp.Models.Schedules;
using BailarinaPreparadaApp.Models.ScheduleTasks;
using BailarinaPreparadaApp.Services.Emails;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace BailarinaPreparadaApp.Services.Schedules
{
    public class ScheduleService : IScheduleService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _memoryCache;

        public ScheduleService(ApplicationDbContext dbContext, IEmailService emailService, IConfiguration configuration, IMemoryCache memoryCache)
        {
            _dbContext = dbContext;
            _emailService = emailService;
            _configuration = configuration;
            _memoryCache = memoryCache;
        }

        public async Task<ScheduleResponse> GetUserScheduleAsync(string userId)
        {
            var cacheKey = CacheKeys.UserSchedule(userId);
            
            if (_memoryCache.TryGetValue(cacheKey, out ScheduleResponse? cachedSchedule))
                return cachedSchedule;
            
            var user = await _dbContext.Users.FindAsync(userId);

            if (user == null)
            {
                throw new NotFoundException("Usuário não encontrado.");
            }

            var schedule = await _dbContext.Schedules
                .Include(s => s.Entries)
                    .ThenInclude(e => e.ActivityLink)
                .FirstOrDefaultAsync(s => s.UserId == userId);

            if (schedule == null)
            {
                schedule = new Schedule
                {
                    UserId = userId,
                    User = user,
                    Entries = new List<ScheduleTask>(),
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _dbContext.Schedules.Add(schedule);
                await _dbContext.SaveChangesAsync();
            }

            var response = new ScheduleResponse
            {
                ScheduleId = schedule.ScheduleId,
                UserId = schedule.UserId,
                UserName = user.Name,
                DateOfBirth = user.DateOfBirth,
                CreatedAt = schedule.CreatedAt,
                UpdatedAt = schedule.UpdatedAt,
                Goal = schedule.Goal,
                Observations = schedule.Observations,
                Tasks = schedule.Entries.Select(e => new ScheduleTaskResponse
                {
                    ScheduleTaskId = e.ScheduleTaskId,
                    DayOfWeek = e.DayOfWeek,
                    Slot = e.Slot,
                    Period = e.Period,
                    Activity = e.Activity,
                    Notes = e.Notes,
                    Color = e.Color,
                    ActivityLinkId = e.ActivityLinkId,
                    Link = e.Link ?? e.ActivityLink?.Link
                }).ToList()
            };

            var cacheOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromDays(3));
            
            _memoryCache.Set(cacheKey, response, cacheOptions);

            return response;
        }

        public async Task<IEnumerable<ScheduleTaskResponse>> GetDailyScheduleAsync(string userId)
        {
            var currentDayOfWeek = (int)DateTime.UtcNow.DayOfWeek;
            var cacheKey = CacheKeys.UserDailySchedule(userId, currentDayOfWeek);
            
            if (_memoryCache.TryGetValue(cacheKey, out IEnumerable<ScheduleTaskResponse>? cachedDailySchedule))
                return cachedDailySchedule;

            var dailySchedule = await _dbContext.ScheduleTasks
                .AsNoTracking()
                .Where(e => e.Schedule.UserId == userId && (int)e.DayOfWeek == currentDayOfWeek)
                .Select(e => new ScheduleTaskResponse
                {
                    ScheduleTaskId = e.ScheduleTaskId,
                    DayOfWeek = e.DayOfWeek,
                    Slot = e.Slot,
                    Period = e.Period,
                    Activity = e.Activity,
                    Notes = e.Notes,
                    Color = e.Color,
                    Link = e.Link,
                    ActivityLinkId = e.ActivityLinkId
                })
                .OrderBy(e => e.Period == "Manhã" ? 1 : e.Period == "Tarde" ? 2 : e.Period == "Noite" ? 3 : 99)
                .ThenBy(e => e.Slot)
                .ToListAsync();

            var cacheOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromHours(6));
            
            _memoryCache.Set(cacheKey, dailySchedule, cacheOptions);
            
            return dailySchedule;
        }

        public async Task<ScheduleResponse> CreateScheduleAsync(CreateScheduleRequest request)
        {
            var user = await _dbContext.Users.FindAsync(request.UserId);

            if (user == null)
            {
                throw new NotFoundException("Usuário não encontrado.");
            }

            var existingSchedule = await _dbContext.Schedules
                .Include(s => s.Entries)
                .FirstOrDefaultAsync(s => s.UserId == request.UserId);

            if (existingSchedule != null)
            {
                existingSchedule.UpdatedAt = DateTime.UtcNow;
                existingSchedule.Goal = request.Goal;
                existingSchedule.Observations = request.Observations;
                existingSchedule.Entries.Clear();

                foreach (var task in request.Tasks)
                {
                    var validatedActivityLinkId = await ValidateActivityLinkAssociation(task.ActivityLinkId, task.Link, task.Color);

                    var newTask = new ScheduleTask
                    {
                        DayOfWeek = task.DayOfWeek,
                        Slot = task.Slot,
                        Period = task.Period,
                        Activity = task.Activity,
                        Notes = task.Notes,
                        Color = task.Color,
                        Link = task.Link,
                        ActivityLinkId = validatedActivityLinkId
                    };

                    existingSchedule.Entries.Add(newTask);
                }

                await _dbContext.SaveChangesAsync();
                InvalidateUserScheduleCache(request.UserId);

                return await GetUserScheduleAsync(request.UserId);
            }

            var schedule = new Schedule
            {
                UserId = request.UserId,
                User = user,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Goal = request.Goal,
                Observations = request.Observations,
                Entries = request.Tasks.Select(t => new ScheduleTask
                {
                    DayOfWeek = t.DayOfWeek,
                    Slot = t.Slot,
                    Period = t.Period,
                    Activity = t.Activity,
                    Notes = t.Notes,
                    Color = t.Color,
                    Link = t.Link,
                    ActivityLinkId = t.ActivityLinkId
                }).ToList()
            };

            _dbContext.Schedules.Add(schedule);
            await _dbContext.SaveChangesAsync();
            InvalidateUserScheduleCache(request.UserId);
            
            return await GetUserScheduleAsync(request.UserId);
        }
        
        public async Task SendScheduleReadyEmailAsync(string userId)
        {
            var user = await _dbContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new NotFoundException("Usuário não encontrado.");
            }

            var scheduleLink = $"{_configuration["AppSettings:FrontendUrl"]}/planejamento";

            var templateData = new Dictionary<string, string>
            {
                { "Name", user.Name },
                { "ScheduleLink", scheduleLink }
            };

            var success = await _emailService.SendEmailAsync(
                toName: user.Name,
                toEmail: user.Email!,
                subject: "Seu planejamento está pronto! - App Bailarina Preparada",
                templateName: "ScheduleReadyTemplate",
                templateData: templateData
            );

            if (!success)
            {
                throw new ValidationException("Não foi possível enviar o e-mail. Tente novamente.");
            }
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
                .Select(t => t.ScheduleTaskId)
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
                        Color = taskRequest.Color,
                        Link = taskRequest.Link,
                        ActivityLinkId = taskRequest.ActivityLinkId
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
                    existingTask.Link = taskRequest.Link;
                    existingTask.ActivityLinkId = await ValidateActivityLinkAssociation(taskRequest.ActivityLinkId, taskRequest.Link, taskRequest.Color);
                }
            }

            schedule.Goal = request.Goal;
            schedule.Observations = request.Observations;
            schedule.UpdatedAt = DateTime.UtcNow;

            await _dbContext.SaveChangesAsync();
            InvalidateUserScheduleCache(schedule.UserId);
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
            InvalidateUserScheduleCache(schedule.UserId);
        }
        
        private void InvalidateUserScheduleCache(string userId)
        {
            _memoryCache.Remove(CacheKeys.UserSchedule(userId));

            for (var day = 0; day < 7; day++)
            {
                _memoryCache.Remove(CacheKeys.UserDailySchedule(userId, day));
            }
        }
        
        private async Task<int?> ValidateActivityLinkAssociation(int? activityLinkId, string? link, string color)
        {
            if (activityLinkId == null) return null;

            var original = await _dbContext.ActivityLinks.FindAsync(activityLinkId.Value);

            if (original != null && original.Link == link && original.DefaultColor == color)
            {
                return activityLinkId;
            }

            return null;
        }
    }
}
