using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.Accounts
{
    public class DeleteUserRequest
    {
        [Required(ErrorMessage = "O ID do usuário é obrigatório.")]
        public string Id { get; set; } = string.Empty;
    }
}
