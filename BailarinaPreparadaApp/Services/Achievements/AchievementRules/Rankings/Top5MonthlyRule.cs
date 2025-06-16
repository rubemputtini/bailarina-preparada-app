using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Services.Rankings;

namespace BailarinaPreparadaApp.Services.Achievements.AchievementRules.Rankings
{
    public class Top5MonthlyRule : IAchievementRule
    {
        private readonly IRankingService _rankingService;
        private readonly Lazy<AchievementService> _achievementService;

        public string Id => AchievementIds.Top5Monthly;

        public Top5MonthlyRule(IRankingService rankingService, Lazy<AchievementService> achievementService)
        {
            _rankingService = rankingService;
            _achievementService = achievementService;
        }

        public async Task EvaluateAsync(string userId)
        {
            var today = DateTime.UtcNow;
            var previousMonthDate = new DateTime(today.Year, today.Month, 1).AddMonths(-1);
            var year = previousMonthDate.Year;
            var month = previousMonthDate.Month;

            var top5 = (await _rankingService.GetRankingAsync(month, year, 5)).ToList();

            if (top5.Any(r => r.UserId == userId))
            {
                var alreadyEarned = await _achievementService.Value.HasAchievementAsync(userId, Id, year, month);

                if (!alreadyEarned )
                {
                    await _achievementService.Value.GrantAchievementAsync(userId, Id);
                }
            }
        }
    }
}
