using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.Services.Trainings;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services.Achievements.AchievementRules.Milestones
{
    public class GoalCompletedRule : IAchievementRule
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly Lazy<IAchievementService> _achievementService;
        private readonly Lazy<ITrainingService> _trainingService;

        public string Id => AchievementIds.GoalCompleted;

        public GoalCompletedRule(ApplicationDbContext dbContext, Lazy<IAchievementService> achievementService, Lazy<ITrainingService> trainingService)
        {
            _dbContext = dbContext;
            _achievementService = achievementService;
            _trainingService = trainingService;
        }

        public async Task EvaluateAsync(string userId)
        {
            var currentYear = DateTime.UtcNow.Year;

            var userGoal = await _dbContext.UserGoals
                .FirstOrDefaultAsync(g => g.UserId == userId && g.Year == currentYear);

            if (userGoal == null || userGoal.GoalDays == 0)
            {
                return;
            }

            var actualDaysTrained = await _trainingService.Value.GetYearlyTrainingDaysCountAsync(userId, currentYear);

            if (actualDaysTrained >= userGoal.GoalDays)
            {
                var alreadyThisYear = await _dbContext.UserAchievements
                    .AnyAsync(a =>
                        a.UserId == userId &&
                        a.AchievementDefinitionId == Id &&
                        a.AchievedAt.Year == currentYear);

                if (!alreadyThisYear)
                {
                    await _achievementService.Value.GrantAchievementAsync(userId, Id);
                }
            }
        }
    }
}
