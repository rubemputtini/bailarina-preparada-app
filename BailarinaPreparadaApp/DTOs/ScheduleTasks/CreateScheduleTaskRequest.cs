using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.ScheduleTasks
{
    public class CreateScheduleTaskRequest
    {
        [Required(ErrorMessage = "O dia da semana é obrigatório.")]
        public DayOfWeek DayOfWeek { get; set; }

        [Required(ErrorMessage = "O slot é obrigatório.")]
        public int Slot { get; set; }

        [Required(ErrorMessage = "O período é obrigatório.")]
        [StringLength(20, ErrorMessage = "O período deve ter no máximo 20 caracteres.")]
        public string Period { get; set; } = string.Empty;

        [Required(ErrorMessage = "A atividade é obrigatória.")]
        [StringLength(50, ErrorMessage = "A atividade deve ter no máximo 50 caracteres.")]
        public string Activity { get; set; } = string.Empty;

        [StringLength(100, ErrorMessage = "As notas devem ter no máximo 100 caracteres.")]
        public string? Notes { get; set; }

        [Required(ErrorMessage = "A cor é obrigatória.")]
        [StringLength(30, ErrorMessage = "A cor deve ter no máximo 30 caracteres.")]
        public string Color { get; set; } = string.Empty;

        [StringLength(500, ErrorMessage = "O link deve ter no máximo 500 caracteres.")]
        public string? Link { get; set; }

        public int? ActivityLinkId { get; set; }
    }
}