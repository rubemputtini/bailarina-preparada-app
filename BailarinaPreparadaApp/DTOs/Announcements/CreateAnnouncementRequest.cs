using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.Announcements
{
    public class CreateAnnouncementRequest
    {
        [Required(ErrorMessage = "O título é obrigatório.")]
        [StringLength(50, ErrorMessage = "O título deve ter no máximo 50 caracteres.")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "O conteúdo é obrigatório.")]
        [StringLength(100, ErrorMessage = "O conteúdo deve ter no máximo 100 caracteres.")]
        public string Content { get; set; } = string.Empty;

        [Required(ErrorMessage = "A data é obrigatória.")]
        public DateTime Date { get; set; }

        public DateTime? PublishAt { get; set; }

        public DateTime? ExpiresAt { get; set; }

        public bool IsVisible { get; set; } = true;

        [StringLength(500, ErrorMessage = "O link deve ter no máximo 500 caracteres.")]
        [Url(ErrorMessage = "O link deve ser uma URL válida.")]
        public string? Link { get; set; }

        [Required(ErrorMessage = "A categoria é obrigatória.")]
        [StringLength(30, ErrorMessage = "A categoria deve ter no máximo 30 caracteres.")]
        public string Category { get; set; } = string.Empty;
    }
}