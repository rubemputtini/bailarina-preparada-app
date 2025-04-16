using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Data;

namespace BailarinaPreparadaApp.Services.Achievements.AchievementRules.Categories
{
    public class Cardio100Rule : CategoryMilestoneRuleBase
    {
        public override string Id => AchievementIds.Cardio100;
        protected override string Category => TrainingCategories.Cardio;
        protected override int Milestone => 100;

        public Cardio100Rule(ApplicationDbContext dbContext, Lazy<AchievementService> achievementService)
            : base(dbContext, achievementService)
        {
        }
    }
}
