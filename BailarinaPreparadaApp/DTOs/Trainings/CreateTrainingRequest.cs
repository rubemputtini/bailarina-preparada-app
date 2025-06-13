using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.Trainings
{
    public class CreateTrainingRequest
    {
        [Required(ErrorMessage = "A categoria é obrigatória.")]
        [StringLength(50, ErrorMessage = "A categoria deve ter no máximo 50 caracteres.")]
        public string Category { get; set; } = string.Empty;

        [Required(ErrorMessage = "A descrição é obrigatória.")]
        [StringLength(100, ErrorMessage = "A descrição deve ter no máximo 100 caracteres.")]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "A data do treino é obrigatória.")]
        public DateTime Date { get; set; } = DateTime.UtcNow;
    }
}