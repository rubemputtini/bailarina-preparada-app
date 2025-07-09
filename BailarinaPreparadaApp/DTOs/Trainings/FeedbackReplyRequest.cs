using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.Trainings;

public class FeedbackReplyRequest
{
    [Required(ErrorMessage = "A mensagem do feedback é obrigatória.")]
    [StringLength(100, ErrorMessage = "A mensagem deve ter no máximo 100 caracteres.")]
    public string Message { get; set; } = string.Empty;
}