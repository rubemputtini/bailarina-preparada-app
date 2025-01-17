﻿using Microsoft.AspNetCore.Identity;

namespace BailarinaPreparadaApp.Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; } = string.Empty;
        public bool IsAdmin { get; set; } = false;
        public string? Country { get; set; }
        public string? City { get; set; }
    }
}
