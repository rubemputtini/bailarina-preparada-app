using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.ActivityLinks
{
    public class ActivityLinkRequest
    {
        [Required(ErrorMessage = "O título é obrigatório.")]
        [StringLength(50, ErrorMessage = "O título deve ter no máximo 50 caracteres.")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "O link é obrigatório.")]
        [StringLength(500, ErrorMessage = "O link deve ter no máximo 500 caracteres.")]
        [Url(ErrorMessage = "O link deve ser uma URL válida.")]
        public string Link { get; set; } = string.Empty;

        [StringLength(30, ErrorMessage = "A cor padrão deve ter no máximo 30 caracteres.")]
        public string? DefaultColor { get; set; }
    }
}