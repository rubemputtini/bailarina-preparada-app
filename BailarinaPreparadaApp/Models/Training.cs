namespace BailarinaPreparadaApp.Models
{
    public class Training
    {
        public int TrainingId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public required User User { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public bool IsCompleted { get; set; } = false;
    }
}
