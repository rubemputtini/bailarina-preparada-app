using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Data;

namespace BailarinaPreparadaApp.Services.Achievements.AchievementRules.Categories
{
    public class Flex100Rule : CategoryMilestoneRuleBase
    {
        public override string Id => AchievementIds.Flex100;
        protected override string Category => TrainingCategories.Flex;
        protected override int Milestone => 100;

        public Flex100Rule(ApplicationDbContext dbContext, Lazy<IAchievementService> achievementService)
            : base(dbContext, achievementService)
        {
        }
    }
}
