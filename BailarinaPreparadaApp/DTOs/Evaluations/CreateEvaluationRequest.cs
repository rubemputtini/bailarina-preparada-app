using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.Evaluations
{
    public class CreateEvaluationRequest
    {
        [Required(ErrorMessage = "O ID do administrador é obrigatório.")]
        [StringLength(450, ErrorMessage = "O ID do administrador deve ter no máximo 450 caracteres.")]
        public string AdminId { get; set; } = string.Empty;

        [Required(ErrorMessage = "O ID do usuário é obrigatório.")]
        [StringLength(450, ErrorMessage = "O ID do usuário deve ter no máximo 450 caracteres.")]
        public string UserId { get; set; } = string.Empty;

        [Required(ErrorMessage = "A data da avaliação é obrigatória.")]
        public DateTime Date { get; set; } = DateTime.UtcNow;

        [Required(ErrorMessage = "O sexo do usuário é obrigatório.")]
        [StringLength(1, ErrorMessage = "O sexo do usuário deve ter apenas 1 caractere.")]
        public string UserGender { get; set; } = string.Empty;

        [Required(ErrorMessage = "A lista de exercícios é obrigatória.")]
        public List<EvaluationExerciseRequest> Exercises { get; set; } = new List<EvaluationExerciseRequest>();

        [StringLength(500, ErrorMessage = "A URL das fotos deve ter no máximo 500 caracteres.")]
        public string? PhotosUrl { get; set; }
    }
}