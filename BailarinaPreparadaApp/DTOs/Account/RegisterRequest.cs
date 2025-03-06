using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.Account
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "O Nome é obrigatório.")]
        [StringLength(50, ErrorMessage = "O Nome deve ter no máximo 50 caracteres.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "O E-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "O formato do E-mail é inválido.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "A senha é obrigatória.")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "A rua é obrigatória.")]
        [StringLength(70, ErrorMessage = "A rua deve ter no máximo 70 caracteres.")]
        public string Street { get; set; } = string.Empty;

        [Required(ErrorMessage = "O número é obrigatório.")]
        public string Number { get; set; } = string.Empty;
        
        public string? Complement { get; set; }

        [Required(ErrorMessage = "O bairro é obrigatório.")]
        public string Neighborhood { get; set; } = string.Empty;

        [Required(ErrorMessage = "A cidade é obrigatória.")]
        public string City { get; set; } = string.Empty;

        [Required(ErrorMessage = "O estado é obrigatório.")]
        public string State { get; set; } = string.Empty;

        [Required(ErrorMessage = "O país é obrigatório.")]
        public string Country { get; set; } = string.Empty;

        [Required(ErrorMessage = "O CEP é obrigatório.")]
        public string PostalCode { get; set; } = string.Empty;

        [Required(ErrorMessage = "A data de nascimento é obrigatória.")]
        public DateTime DateOfBirth { get; set; }
    }
}
