namespace BailarinaPreparadaApp.Models
{
    public class ActivityLink
    {
        public int ActivityLinkId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Link { get; set; } = string.Empty;
        public string? DefaultColor { get; set; }
        public bool IsActive { get; set; } = true;
        public List<ScheduleTask> ScheduleTasks { get; set; } = new List<ScheduleTask>();
    }
}
