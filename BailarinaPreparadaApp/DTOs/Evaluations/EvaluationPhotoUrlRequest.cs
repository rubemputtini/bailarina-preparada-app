using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.Evaluations
{
    public class EvaluationPhotoUrlRequest
    {
        [Required(ErrorMessage = "A URL das fotos é obrigatória.")]
        [StringLength(500, ErrorMessage = "A URL das fotos deve ter no máximo 500 caracteres.")]
        [Url(ErrorMessage = "A URL fornecida não é válida.")]
        public string PhotosUrl { get; set; } = string.Empty;
    }
}