using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Data;

namespace BailarinaPreparadaApp.Services.Achievements.AchievementRules.Categories
{
    public class Feet100Rule : CategoryMilestoneRuleBase
    {
        public override string Id => AchievementIds.Feet100;
        protected override string Category => TrainingCategories.Feet;
        protected override int Milestone => 100;

        public Feet100Rule(ApplicationDbContext dbContext, Lazy<AchievementService> achievementService)
            : base(dbContext, achievementService)
        {
        }
    }
}
