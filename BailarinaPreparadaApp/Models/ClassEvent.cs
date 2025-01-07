namespace BailarinaPreparadaApp.Models
{
    public class ClassEvent
    {
        public int ClassEventId { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string Time { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
