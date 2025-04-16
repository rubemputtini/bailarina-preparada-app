using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Data;

namespace BailarinaPreparadaApp.Services.Achievements.AchievementRules.Categories
{
    public class EnDehors100Rule : CategoryMilestoneRuleBase
    {
        public override string Id => AchievementIds.EnDehors100;
        protected override string Category => TrainingCategories.EnDehors;
        protected override int Milestone => 100;

        public EnDehors100Rule(ApplicationDbContext dbContext, Lazy<AchievementService> achievementService)
            : base(dbContext, achievementService)
        {
        }
    }
}
