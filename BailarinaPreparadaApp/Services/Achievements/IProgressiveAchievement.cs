namespace BailarinaPreparadaApp.Services.Achievements.AchievementRules
{
    public interface IProgressiveAchievement
    {
        Task<(int current, int goal)> GetProgressAsync(string userId);
    }
}
