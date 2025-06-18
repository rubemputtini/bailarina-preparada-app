using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Data;

namespace BailarinaPreparadaApp.Services.Achievements.AchievementRules.Categories
{
    public class Power100Rule : CategoryMilestoneRuleBase
    {
        public override string Id => AchievementIds.Power100;
        protected override string Category => TrainingCategories.Power;
        protected override int Milestone => 100;

        public Power100Rule(ApplicationDbContext dbContext, Lazy<IAchievementService> achievementService)
            : base(dbContext, achievementService)
        {
        }
    }
}
