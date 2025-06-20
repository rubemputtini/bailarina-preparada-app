using BailarinaPreparadaApp.DTOs.Achievements;

namespace BailarinaPreparadaApp.Services.Achievements;

public interface IAchievementService
{
    Task<List<AchievementResponse>> GetAchievementsForUserAsync(string userId);
    
    Task<bool> GrantAchievementAsync(string userId, string achievementId, DateTime? referenceDate = null);

    Task<bool> HasAchievementAsync(string userId, string achievementId, DateTime referenceDate);

    Task EvaluateAllRulesAsync(string userId);
}