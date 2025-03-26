using BailarinaPreparadaApp.Models;

namespace BailarinaPreparadaApp.DTOs.Announcement
{
    public class CreateAnnouncementRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public DateTime? PublishAt { get; set; }
        public DateTime? ExpiresAt { get; set; }
        public bool IsVisible { get; set; } = true;
        public string? Link { get; set; }
        public string Category { get; set; } = string.Empty;
    }
}
