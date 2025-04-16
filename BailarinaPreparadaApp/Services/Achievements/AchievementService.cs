using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Achievements;
using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Models.Achievements;
using BailarinaPreparadaApp.Services.Achievements.AchievementRules;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services.Achievements
{
    public class AchievementService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IEnumerable<IAchievementRule> _achievementsRules;

        public AchievementService(ApplicationDbContext dbContext, IEnumerable<IAchievementRule> achievementsRules)
        {
            _dbContext = dbContext;
            _achievementsRules = achievementsRules;
        }

        public async Task<List<AchievementResponse>> GetAchievementsForUserAsync(string userId)
        {
            var definitions = await _dbContext.AchievementDefinitions
                .Where(a => a.IsActive)
                .ToListAsync();

            var userAchievements = await _dbContext.UserAchievements
                .Where(ua => ua.UserId == userId)
                .ToListAsync();

            var result = new List<AchievementResponse>();

            foreach (var def in definitions)
            {
                var unlocked = userAchievements
                    .Where(ua => ua.AchievementDefinitionId == def.AchievementDefinitionId)
                    .ToList();

                var response = new AchievementResponse
                {
                    AchievementId = def.AchievementDefinitionId,
                    Title = def.Title,
                    Description = def.Description,
                    Icon = def.Icon,
                    Unlocked = unlocked.Any(),
                    AchievedAt = unlocked.OrderByDescending(x => x.AchievedAt).FirstOrDefault()?.AchievedAt,
                    TimesAchieved = unlocked.Count
                };
                await EvaluateAchievementProgress(userId, def, response);

                result.Add(response);
            }

            return result;
        }

        private async Task EvaluateAchievementProgress(string userId, AchievementDefinition def, AchievementResponse response)
        {
            var rule = _achievementsRules.FirstOrDefault(r => r.Id == def.AchievementDefinitionId);

            if (rule is IProgressiveAchievement progressiveRule)
            {
                var (current, goal) = await progressiveRule.GetProgressAsync(userId);

                response.CurrentProgress = current;
                response.GoalTarget = goal;
            }
        }

        public async Task<bool> GrantAchievementAsync(string userId, string achievementId)
        {
            var count = await _dbContext.UserAchievements
                .Where(ua => ua.UserId == userId && ua.AchievementDefinitionId == achievementId)
                .CountAsync();

            var achievement = await _dbContext.AchievementDefinitions
                .FirstOrDefaultAsync(a => a.AchievementDefinitionId == achievementId && a.IsActive);

            if (achievement == null)
            {
                throw new NotFoundException("Conquista não encontrada ou está desativada.");
            }

            _dbContext.UserAchievements.Add(new UserAchievement
            {
                UserId = userId,
                AchievementDefinitionId = achievementId,
                AchievedAt = DateTime.UtcNow,
                Sequence = count + 1
            });

            await _dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> HasAchievementAsync(string userId, string achievementId, int year, int month)
        {
            return await _dbContext.UserAchievements
                .AnyAsync(ua =>
                    ua.UserId == userId &&
                    ua.AchievementDefinitionId == achievementId &&
                    ua.AchievedAt.Year == year &&
                    ua.AchievedAt.Month == month);
        }

        public async Task EvaluateAllRulesAsync(string userId)
        {
            foreach (var rule in _achievementsRules)
            {
                await rule.EvaluateAsync(userId);
            }
        }
    }
}
