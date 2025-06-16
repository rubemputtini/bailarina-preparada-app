using BailarinaPreparadaApp.DTOs.Schedules;
using BailarinaPreparadaApp.DTOs.ScheduleTasks;

namespace BailarinaPreparadaApp.Services.Schedules;

public interface IScheduleService
{
    Task<ScheduleResponse> GetUserScheduleAsync(string userId);

    Task<IEnumerable<ScheduleTaskResponse>> GetDailyScheduleAsync(string userId);

    Task<ScheduleResponse> CreateScheduleAsync(CreateScheduleRequest request);

    Task SendScheduleReadyEmailAsync(string userId);

    Task UpdateScheduleAsync(int scheduleId, UpdateScheduleRequest request);

    Task DeleteScheduleAsync(int scheduleId);
}