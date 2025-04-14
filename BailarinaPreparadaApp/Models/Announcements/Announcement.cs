using BailarinaPreparadaApp.Models.Users;

namespace BailarinaPreparadaApp.Models.Announcements
{
    public class Announcement
    {
        public int AnnouncementId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public DateTime? PublishAt { get; set; }
        public DateTime? ExpiresAt { get; set; }
        public string AuthorId { get; set; } = string.Empty;
        public required User Author { get; set; }
        public bool IsVisible { get; set; } = true;
        public string? Link { get; set; }
        public AnnouncementCategory Category { get; set; }
    }
}
