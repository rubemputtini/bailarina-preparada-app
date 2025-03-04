namespace BailarinaPreparadaApp.DTOs.Training
{
    public class CreateTrainingRequest
    {
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.UtcNow;
    }
}
