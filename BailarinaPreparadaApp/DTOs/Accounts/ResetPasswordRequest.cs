using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.Accounts
{
    public class ResetPasswordRequest
    {
        [Required(ErrorMessage = "O Email do usuário é obrigatório.")]
        [EmailAddress(ErrorMessage = "O formato do E-mail é inválido.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "O Token do usuário é obrigatório.")]
        public string Token { get; set; } = string.Empty;

        [Required(ErrorMessage = "A nova senha do usuário é obrigatória.")]
        public string NewPassword { get; set; } = string.Empty;
    }
}
