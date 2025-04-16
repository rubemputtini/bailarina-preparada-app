using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Data;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services.Achievements.AchievementRules.Streaks
{
    public class PerfectWeekRule : IAchievementRule
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly Lazy<AchievementService> _achievementService;

        public string Id => AchievementIds.PerfectWeek;

        public PerfectWeekRule(ApplicationDbContext dbContext, Lazy<AchievementService> achievementService)
        {
            _dbContext = dbContext;
            _achievementService = achievementService;
        }

        public async Task EvaluateAsync(string userId)
        {
            var today = DateTime.UtcNow.Date;
            var lastSunday = today.AddDays(-(int)today.DayOfWeek);
            var previousMonday = lastSunday.AddDays(-6);

            var trainedDays = await _dbContext.Trainings
                .Where(t =>
                    t.UserId == userId &&
                    t.IsCompleted &&
                    t.Date.Date >= previousMonday &&
                    t.Date.Date <= lastSunday)
                .Select(t => t.Date.Date.DayOfWeek)
                .Distinct()
                .ToListAsync();

            var fullWeekDays = Enum.GetValues<DayOfWeek>().ToHashSet();

            if (trainedDays.Count == 7 && trainedDays.All(fullWeekDays.Contains))
            {
                var alreadyEarned = await _dbContext.UserAchievements
                    .AnyAsync(a =>
                        a.UserId == userId &&
                        a.AchievementDefinitionId == Id &&
                        a.AchievedAt >= previousMonday &&
                        a.AchievedAt <= lastSunday);

                if (!alreadyEarned)
                {
                    await _achievementService.Value.GrantAchievementAsync(userId, Id);
                }
            }
        }
    }
}
