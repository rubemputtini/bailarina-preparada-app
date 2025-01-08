namespace BailarinaPreparadaApp.Models
{
    public class Schedule
    {
        public int ScheduleId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public required User User { get; set; }
        public List<ScheduleTask> Entries { get; set; } = new List<ScheduleTask>();
    }
}
