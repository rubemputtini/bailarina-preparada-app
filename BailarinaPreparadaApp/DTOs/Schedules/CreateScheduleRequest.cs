using BailarinaPreparadaApp.DTOs.ScheduleTasks;

namespace BailarinaPreparadaApp.DTOs.Schedules
{
    public class CreateScheduleRequest
    {
        public string UserId { get; set; } = string.Empty;
        public List<CreateScheduleTaskRequest> Tasks { get; set; } = new List<CreateScheduleTaskRequest>();
        public string Goal { get; set; } = string.Empty;
        public string Observations { get; set; } = string.Empty;
    }
}
