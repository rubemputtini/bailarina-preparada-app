using BailarinaPreparadaApp.DTOs.ScheduleTasks;

namespace BailarinaPreparadaApp.DTOs.Schedules
{
    public class ScheduleResponse
    {
        public int ScheduleId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public List<ScheduleTaskResponse> Tasks { get; set; } = new List<ScheduleTaskResponse>();
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Goal { get; set; } = string.Empty;
        public string Observations { get; set; } = string.Empty;
    }
}
