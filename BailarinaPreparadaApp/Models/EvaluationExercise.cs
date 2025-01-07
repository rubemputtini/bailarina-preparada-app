namespace BailarinaPreparadaApp.Models
{
    public class EvaluationExercise
    {
        public int EvaluationExerciseId { get; set; }
        public int EvaluationId { get; set; }
        public Evaluation? Evaluation { get; set; }
        public string ExerciseName { get; set; } = string.Empty;
        public ExerciseCategory ExerciseCategory { get; set; }
        public int Score { get; set; } = 0;
    }
}
