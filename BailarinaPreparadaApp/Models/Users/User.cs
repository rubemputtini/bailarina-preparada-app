﻿using BailarinaPreparadaApp.Models.Addresses;
using Microsoft.AspNetCore.Identity;

namespace BailarinaPreparadaApp.Models.Users
{
    public class User : IdentityUser
    {
        public string Name { get; set; } = string.Empty;
        public bool IsAdmin { get; set; } = false;

        public Address Address { get; set; } = null!;
        public DateTime DateOfBirth { get; set; }
        public List<UserGoal> Goals { get; set; } = new List<UserGoal>();
    }
}
