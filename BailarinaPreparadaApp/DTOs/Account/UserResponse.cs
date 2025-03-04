namespace BailarinaPreparadaApp.DTOs.Account
{
    public class UserResponse
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public bool IsAdmin { get; set; } = false;
        public string? PhoneNumber { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
    }
}
