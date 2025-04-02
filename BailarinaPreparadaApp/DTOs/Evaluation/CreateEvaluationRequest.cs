using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.Evaluation
{
    public class CreateEvaluationRequest
    {
        [Required(ErrorMessage = "O ID do administrador é obrigatório.")]
        public string AdminId { get; set; } = string.Empty;

        [Required(ErrorMessage = "O ID do usuário é obrigatório.")]
        public string UserId { get; set; } = string.Empty;

        [Required(ErrorMessage = "A data da avaliação é obrigatória.")]
        public DateTime Date { get; set; } = DateTime.UtcNow;

        [Required(ErrorMessage = "O sexo do usuário é obrigatório.")]
        public string UserGender { get; set; } = string.Empty;

        [Required(ErrorMessage = "A lista de exercícios é obrigatória.")]
        public List<EvaluationExerciseRequest> Exercises { get; set; } = new List<EvaluationExerciseRequest>();
    }
}
