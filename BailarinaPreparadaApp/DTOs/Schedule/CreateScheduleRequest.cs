using BailarinaPreparadaApp.DTOs.ScheduleTask;

namespace BailarinaPreparadaApp.DTOs.Schedule
{
    public class CreateScheduleRequest
    {
        public string UserId { get; set; } = string.Empty;
        public List<CreateScheduleTaskRequest> Tasks { get; set; } = new List<CreateScheduleTaskRequest>();
    }
}
