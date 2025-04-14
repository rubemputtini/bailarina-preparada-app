using BailarinaPreparadaApp.DTOs.Exercises;
using BailarinaPreparadaApp.Models.Exercises;

namespace BailarinaPreparadaApp.DTOs.Evaluations
{
    public class EvaluationExerciseResponse
    {
        public ExerciseResponse Exercise { get; set; } = new ExerciseResponse();
        public int Score { get; set; }
        public string? Observation { get; set; }
        public ExerciseSide Side { get; set; } = ExerciseSide.None;
    }
}
