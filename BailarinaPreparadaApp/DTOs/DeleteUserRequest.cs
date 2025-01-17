﻿using System.ComponentModel.DataAnnotations;

namespace BailarinaPreparadaApp.DTOs
{
    public class DeleteUserRequest
    {
        [Required(ErrorMessage = "O ID do usuário é obrigatório.")]
        public string Id { get; set; } = string.Empty;
    }
}
