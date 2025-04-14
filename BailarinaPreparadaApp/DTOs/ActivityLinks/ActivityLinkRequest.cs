namespace BailarinaPreparadaApp.DTOs.ActivityLinks
{
    public class ActivityLinkRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Link { get; set; } = string.Empty;
        public string? DefaultColor { get; set; }
    }
}
