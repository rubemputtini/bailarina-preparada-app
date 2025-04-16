namespace BailarinaPreparadaApp.Services.Achievements.AchievementRules
{
    public interface IAchievementRule
    {
        string Id { get; }
        Task EvaluateAsync(string userId);
    }
}
