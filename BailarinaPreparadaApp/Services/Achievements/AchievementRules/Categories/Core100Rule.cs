using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Data;

namespace BailarinaPreparadaApp.Services.Achievements.AchievementRules.Categories
{
    public class Core100Rule : CategoryMilestoneRuleBase
    {
        public override string Id => AchievementIds.Core100;
        protected override string Category => TrainingCategories.Core;
        protected override int Milestone => 100;

        public Core100Rule(ApplicationDbContext dbContext, Lazy<AchievementService> achievementService)
            : base(dbContext, achievementService)
        {
        }
    }
}
