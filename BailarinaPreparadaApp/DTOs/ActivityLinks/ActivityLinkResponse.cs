namespace BailarinaPreparadaApp.DTOs.ActivityLinks
{
    public class ActivityLinkResponse
    {
        public int ActivityLinkId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Link { get; set; } = string.Empty;
        public string? DefaultColor { get; set; }
        public bool IsActive { get; set; }
    }
}
