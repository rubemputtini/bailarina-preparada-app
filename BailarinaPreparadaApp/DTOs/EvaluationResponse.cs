namespace BailarinaPreparadaApp.DTOs
{
    public class EvaluationResponse
    {
        public int EvaluationId { get; set; }
        public string AdminName { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public List<EvaluationExerciseResponse> Exercises { get; set; } = new List<EvaluationExerciseResponse>();
    }
}
