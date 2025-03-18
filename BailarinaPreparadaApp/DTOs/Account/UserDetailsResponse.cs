namespace BailarinaPreparadaApp.DTOs.Account
{
    public class UserDetailsResponse
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Street { get; set; } = string.Empty;
        public string Number { get; set; } = string.Empty;
        public string? Complement { get; set; }
        public string Neighborhood { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string State { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string PostalCode { get; set; } = string.Empty;
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }

        public DateTime DateOfBirth { get; set; }
    }
}
