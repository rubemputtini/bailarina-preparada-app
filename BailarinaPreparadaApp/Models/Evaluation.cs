namespace BailarinaPreparadaApp.Models
{
    public class Evaluation
    {
        public int EvaluationId { get; set; }
        public string AdminId { get; set; } = string.Empty;
        public required User Admin { get; set; }
        public string UserId { get; set; } = string.Empty;
        public required User User { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public List<EvaluationExercise> Exercises { get; set; } = new List<EvaluationExercise>();
    }
}
