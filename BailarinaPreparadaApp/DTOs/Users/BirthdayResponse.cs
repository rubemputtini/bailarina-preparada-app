namespace BailarinaPreparadaApp.DTOs.Users
{
    public class BirthdayResponse
    {
        public string UserId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public int Age { get; set; }
        public int DaysUntilBirthday { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
    }
}
