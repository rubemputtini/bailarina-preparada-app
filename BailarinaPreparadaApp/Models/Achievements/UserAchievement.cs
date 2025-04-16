using BailarinaPreparadaApp.Models.Users;

namespace BailarinaPreparadaApp.Models.Achievements
{
    public class UserAchievement
    {
        public int UserAchievementId { get; set; }
        public string UserId { get; set; } = string.Empty;
        public User User { get; set; } = null!;
        public string AchievementDefinitionId { get; set; } = string.Empty;
        public AchievementDefinition AchievementDefinition { get; set; } = null!;
        public DateTime AchievedAt { get; set; } = DateTime.UtcNow;
        public int? Sequence { get; set; }
    }
}
