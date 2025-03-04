using BailarinaPreparadaApp.DTOs.Exercise;

namespace BailarinaPreparadaApp.DTOs.Evaluation
{
    public class EvaluationExerciseResponse
    {
        public ExerciseResponse Exercise { get; set; } = new ExerciseResponse();
        public int Score { get; set; }
        public string? Observation { get; set; }
    }
}
