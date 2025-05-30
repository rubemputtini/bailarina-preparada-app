﻿using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs.Accounts
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "O E-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "O formato do E-mail é inválido.")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "A senha é obrigatória.")]
        public string Password { get; set; } = string.Empty;
    }
}
