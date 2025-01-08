namespace BailarinaPreparadaApp.Models
{
    public class EvaluationExercise
    {
        public int EvaluationExerciseId { get; set; }
        public int EvaluationId { get; set; }
        public Evaluation Evaluation { get; set; } = null!;
        public int ExerciseId { get; set; }
        public Exercise Exercise { get; set; } = null!;
        public int Score { get; set; } = 0;
    }
}
