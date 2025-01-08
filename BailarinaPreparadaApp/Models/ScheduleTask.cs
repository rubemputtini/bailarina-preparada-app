namespace BailarinaPreparadaApp.Models
{
    public class ScheduleTask
    {
        public int ScheduleTaskId { get; set; }
        public int ScheduleEntryId { get; set; }
        public int ScheduleId { get; set; }
        public Schedule Schedule { get; set; } = null!;
        public DayOfWeek DayOfWeek { get; set; }
        public TimeOnly? Time { get; set; }
        public string Activity { get; set; } = string.Empty;
        public string? Notes { get; set; }
    }
}
