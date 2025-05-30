﻿using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.Accounts
{
    public class EditUserRequest
    {
        [Required(ErrorMessage = "O nome do usuário é obrigatório.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "O E-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "O formato do E-mail é inválido.")] public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "O número de telefone do usuário é obrigatório.")]
        [Phone(ErrorMessage = "O formato do número de telefone é inválido.")]
        public string PhoneNumber { get; set; } = string.Empty;

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

        public double? Latitude { get; set; }
        public double? Longitude { get; set; }

        [Required(ErrorMessage = "A data de nascimento é obrigatória.")]
        public DateTime DateOfBirth { get; set; }
    }
}
