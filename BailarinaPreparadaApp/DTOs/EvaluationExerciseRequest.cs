using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs
{
    public class EvaluationExerciseRequest
    {
        [Required(ErrorMessage = "O ID do exercício é obrigatório.")]
        public int ExerciseId { get; set; }

        [Required(ErrorMessage = "A pontuação do exercício é obrigatória.")]
        [Range(0, 100, ErrorMessage = "A pontuação deve estar entre 0 e 100.")]
        public int Score { get; set; } = 0;
    }
}
