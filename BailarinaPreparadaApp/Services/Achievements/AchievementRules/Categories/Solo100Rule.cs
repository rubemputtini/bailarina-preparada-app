using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Data;

namespace BailarinaPreparadaApp.Services.Achievements.AchievementRules.Categories
{
    public class Solo100Rule : CategoryMilestoneRuleBase
    {
        public override string Id => AchievementIds.Solo100;
        protected override string Category => TrainingCategories.Solo;
        protected override int Milestone => 100;

        public Solo100Rule(ApplicationDbContext dbContext, Lazy<AchievementService> achievementService)
            : base(dbContext, achievementService)
        {
        }
    }
}
