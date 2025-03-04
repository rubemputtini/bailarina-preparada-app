using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.Account
{
    public class DeleteUserRequest
    {
        [Required(ErrorMessage = "O ID do usuário é obrigatório.")]
        public string Id { get; set; } = string.Empty;
    }
}
