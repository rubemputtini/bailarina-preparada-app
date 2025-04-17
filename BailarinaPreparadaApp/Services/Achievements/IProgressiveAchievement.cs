namespace BailarinaPreparadaApp.Services.Achievements
{
    public interface IProgressiveAchievement
    {
        Task<(int current, int goal)> GetProgressAsync(string userId);
    }
}
