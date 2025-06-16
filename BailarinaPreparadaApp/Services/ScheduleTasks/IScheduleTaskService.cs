namespace BailarinaPreparadaApp.Services.ScheduleTasks;

public interface IScheduleTaskService
{
    Task DeleteScheduleTaskAsync(int scheduleTaskId);
}