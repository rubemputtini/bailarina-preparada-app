using BailarinaPreparadaApp.DTOs.Achievements;

namespace BailarinaPreparadaApp.Services.Achievements;

public interface IAchievementService
{
    Task<List<AchievementResponse>> GetAchievementsForUserAsync(string userId);
    
    Task<bool> GrantAchievementAsync(string userId, string achievementId);

    Task<bool> HasAchievementAsync(string userId, string achievementId, int year, int month);

    Task EvaluateAllRulesAsync(string userId);
}