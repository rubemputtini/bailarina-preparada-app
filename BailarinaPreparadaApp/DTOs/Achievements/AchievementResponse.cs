namespace BailarinaPreparadaApp.DTOs.Achievements
{
    public class AchievementResponse
    {
        public string AchievementId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Icon { get; set; } = string.Empty;
        public bool Unlocked { get; set; }
        public DateTime? AchievedAt { get; set; }
        public int TimesAchieved { get; set; }
        public int? CurrentProgress { get; set; }
        public int? GoalTarget { get; set; }
    }
}
