using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.Evaluations
{
    public class EvaluationExerciseRequest
    {
        [Required(ErrorMessage = "O ID do exercício é obrigatório.")]
        public int ExerciseId { get; set; }

        [Required(ErrorMessage = "A pontuação do exercício é obrigatória.")]
        [Range(0, 100, ErrorMessage = "A pontuação deve estar entre 0 e 100.")]
        public int Score { get; set; } = 0;

        [StringLength(500, ErrorMessage = "A observação deve ter no máximo 500 caracteres.")]
        public string? Observation { get; set; }

        [Required(ErrorMessage = "O lado do exercício é obrigatório.")]
        [RegularExpression("^(Right|Left|None)$", ErrorMessage = "O lado do exercício deve ser Right, Left ou None.")]
        public string Side { get; set; } = string.Empty;
    }
}