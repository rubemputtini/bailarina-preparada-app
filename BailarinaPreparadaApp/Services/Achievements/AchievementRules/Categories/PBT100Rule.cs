using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Data;

namespace BailarinaPreparadaApp.Services.Achievements.AchievementRules.Categories
{
    public class PBT100Rule : CategoryMilestoneRuleBase
    {
        public override string Id => AchievementIds.PBT100;
        protected override string Category => TrainingCategories.PBT;
        protected override int Milestone => 100;

        public PBT100Rule(ApplicationDbContext dbContext, Lazy<IAchievementService> achievementService)
            : base(dbContext, achievementService)
        {
        }
    }
}
