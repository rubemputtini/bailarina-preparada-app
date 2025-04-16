using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Data;

namespace BailarinaPreparadaApp.Services.Achievements.AchievementRules.Categories
{
    public class Strength100Rule : CategoryMilestoneRuleBase
    {
        public override string Id => AchievementIds.Strength100;
        protected override string Category => TrainingCategories.Strength;
        protected override int Milestone => 100;

        public Strength100Rule(ApplicationDbContext dbContext, Lazy<AchievementService> achievementService)
            : base(dbContext, achievementService)
        {
        }
    }
}
