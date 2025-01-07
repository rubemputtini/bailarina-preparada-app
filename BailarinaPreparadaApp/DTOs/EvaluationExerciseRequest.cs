using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs
{
    public class EvaluationExerciseRequest
    {
        [Required(ErrorMessage = "O ID do exercício é obrigatório.")]
        public int ExerciseId { get; set; }

        [Required(ErrorMessage = "O nome do exercício é obrigatório.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "A pontuação do exercício é obrigatória.")]
        public int Score { get; set; } = 0;

        [Required(ErrorMessage = "A categoria do exercício é obrigatória.")]
        public string ExerciseCategory { get; set; } = string.Empty;
    }
}
