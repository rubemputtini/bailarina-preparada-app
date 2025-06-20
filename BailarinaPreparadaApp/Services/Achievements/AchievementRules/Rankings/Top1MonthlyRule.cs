using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Services.Rankings;

namespace BailarinaPreparadaApp.Services.Achievements.AchievementRules.Rankings
{
    public class Top1MonthlyRule : IAchievementRule
    {
        private readonly IRankingService _rankingService;
        private readonly Lazy<IAchievementService> _achievementService;

        public string Id => AchievementIds.Top1Monthly;

        public Top1MonthlyRule(IRankingService rankingService, Lazy<IAchievementService> achievementService)
        {
            _rankingService = rankingService;
            _achievementService = achievementService;
        }

        public async Task EvaluateAsync(string userId)
        {
            var today = DateTime.UtcNow;
            var referenceDate = new DateTime(today.Year, today.Month, 1).AddMonths(-1);

            var alreadyEarned =
                await _achievementService.Value.HasAchievementAsync(userId, Id, referenceDate);

            if (alreadyEarned) return;

            var top1 = (await _rankingService.GetRankingAsync(referenceDate.Month, referenceDate.Year, 1))
                .FirstOrDefault();

            if (top1 != null && top1.UserId == userId)
            {
                await _achievementService.Value.GrantAchievementAsync(userId, Id, referenceDate);
            }
        }
    }
}