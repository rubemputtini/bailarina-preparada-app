using BailarinaPreparadaApp.Models.Exercises;

namespace BailarinaPreparadaApp.Models.Evaluations
{
    public class EvaluationExercise
    {
        public int EvaluationExerciseId { get; set; }
        public int EvaluationId { get; set; }
        public Evaluation Evaluation { get; set; } = null!;
        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; } = null!;
        public ExerciseSide Side { get; set; } = ExerciseSide.None;
        public int Score { get; set; } = 0;
        public string Observation { get; set; } = string.Empty;
    }
}
