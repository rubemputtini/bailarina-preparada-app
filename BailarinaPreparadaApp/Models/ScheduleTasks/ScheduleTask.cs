using BailarinaPreparadaApp.Models.ActivityLinks;
using BailarinaPreparadaApp.Models.Schedules;
using System.Text.Json.Serialization;

namespace BailarinaPreparadaApp.Models.ScheduleTasks
{
    public class ScheduleTask
    {
        public int ScheduleTaskId { get; set; }
        public int ScheduleId { get; set; }

        [JsonIgnore]
        public Schedule Schedule { get; set; } = null!;
        public DayOfWeek DayOfWeek { get; set; }
        public int Slot { get; set; }
        public string Period { get; set; } = string.Empty;
        public string Activity { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public string Color { get; set; } = string.Empty;
        public string? Link { get; set; }
        public int? ActivityLinkId { get; set; }
        public ActivityLink? ActivityLink { get; set; }
    }
}
