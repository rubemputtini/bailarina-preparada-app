using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Data;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services.Achievements.AchievementRules.Streaks
{
    public class PerfectMonthRule : IAchievementRule
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly Lazy<AchievementService> _achievementService;

        public string Id => AchievementIds.PerfectMonth;

        public PerfectMonthRule(ApplicationDbContext dbContext, Lazy<AchievementService> achievementService)
        {
            _dbContext = dbContext;
            _achievementService = achievementService;
        }

        public async Task EvaluateAsync(string userId)
        {
            var now = DateTime.UtcNow;
            var firstDayOfMonth = new DateTime(now.Year, now.Month, 1);
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);

            var trainedDates = await _dbContext.Trainings
                .Where(t =>
                    t.UserId == userId &&
                    t.IsCompleted &&
                    t.Date.Date >= firstDayOfMonth &&
                    t.Date.Date <= lastDayOfMonth)
                .Select(t => t.Date.Date)
                .Distinct()
                .ToListAsync();

            var fullMonthDays = DateTime.DaysInMonth(now.Year, now.Month);

            if (trainedDates.Count == fullMonthDays)
            {
                var alreadyEarned = await _dbContext.UserAchievements
                    .AnyAsync(a =>
                        a.UserId == userId &&
                        a.AchievementDefinitionId == Id &&
                        a.AchievedAt.Month == now.Month &&
                        a.AchievedAt.Year == now.Year);

                if (!alreadyEarned)
                {
                    await _achievementService.Value.GrantAchievementAsync(userId, Id);
                }
            }
        }
    }
}
