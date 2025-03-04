using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.Account
{
    public class EditUserRequest
    {
        [Required(ErrorMessage = "O nome do usuário é obrigatório.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "O E-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "O formato do E-mail é inválido.")] public string Email { get; set; } = string.Empty;

        [Phone(ErrorMessage = "O formato do número de telefone é inválido.")]
        public string? PhoneNumber { get; set; }

        public string? Country { get; set; }

        public string? City { get; set; }
    }
}
