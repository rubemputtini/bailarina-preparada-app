namespace BailarinaPreparadaApp.DTOs
{
    public class EvaluationExerciseResponse
    {
        public ExerciseResponse Exercise { get; set; } = new ExerciseResponse();
        public int Score { get; set; }
    }
}
