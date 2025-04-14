using BailarinaPreparadaApp.Models.ScheduleTasks;
using BailarinaPreparadaApp.Models.Users;

namespace BailarinaPreparadaApp.Models.Schedules
{
    public class Schedule
    {
        public int ScheduleId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public required User User { get; set; }
        public List<ScheduleTask> Entries { get; set; } = new List<ScheduleTask>();
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public string Goal { get; set; } = string.Empty;
        public string Observations { get; set; } = string.Empty;
    }
}
