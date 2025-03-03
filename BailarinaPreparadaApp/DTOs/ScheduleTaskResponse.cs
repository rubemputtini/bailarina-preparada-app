namespace BailarinaPreparadaApp.DTOs
{
    public class ScheduleTaskResponse
    {
        public int ScheduleTaskId { get; set; }
        public DayOfWeek DayOfWeek { get; set; }
        public int Slot { get; set; }
        public string Period { get; set; } = string.Empty;
        public string Activity { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public string Color { get; set; } = string.Empty;
    }
}
