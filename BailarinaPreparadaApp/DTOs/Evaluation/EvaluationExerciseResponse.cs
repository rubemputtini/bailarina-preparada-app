using BailarinaPreparadaApp.DTOs.Exercise;
using BailarinaPreparadaApp.Models;

namespace BailarinaPreparadaApp.DTOs.Evaluation
{
    public class EvaluationExerciseResponse
    {
        public ExerciseResponse Exercise { get; set; } = new ExerciseResponse();
        public int Score { get; set; }
        public string? Observation { get; set; }
        public ExerciseSide Side { get; set; } = ExerciseSide.None;
    }
}
