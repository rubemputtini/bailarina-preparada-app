namespace BailarinaPreparadaApp.Models
{
    public class Announcement
    {
        public int AnnouncementId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string AuthorId { get; set; } = string.Empty;
        public required User Author { get; set; }
    }
}
