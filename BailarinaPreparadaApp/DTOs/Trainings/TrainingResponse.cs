namespace BailarinaPreparadaApp.DTOs.Trainings
{
    public class TrainingResponse
    {
        public int TrainingId { get; set; }
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.UtcNow;
    }
}
