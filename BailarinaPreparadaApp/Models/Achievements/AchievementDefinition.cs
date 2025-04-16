namespace BailarinaPreparadaApp.Models.Achievements
{
    public class AchievementDefinition
    {
        public string AchievementDefinitionId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }
}
