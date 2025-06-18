using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.Services.Achievements;
using BailarinaPreparadaApp.Services.Achievements.AchievementRules.Categories;
using Moq;

namespace BailarinaPreparadaApp.Tests.Services.Achievements.AchievementRules.Categories;

public class Power100RuleTests : CategoryMilestoneRuleTestBase<Power100Rule>
{
    protected override string Category => TrainingCategories.Power;
    protected override string AchievementId => AchievementIds.Power100;
    protected override int Milestone => 100;
    
    protected override Power100Rule CreateRule(ApplicationDbContext context, Mock<IAchievementService> achievementMock)
    {
        return new Power100Rule(context, new Lazy<IAchievementService>(() => achievementMock.Object));
    }
    
    [Fact]
    public async Task EvaluateAsync_ShouldGrantAchievement()
        => await Test_EvaluateAsync_ShouldGrantAchievement();

    [Fact]
    public async Task EvaluateAsync_ShouldNotGrantAchievement()
        => await Test_EvaluateAsync_ShouldNotGrantAchievement();

    [Fact]
    public async Task EvaluateAsync_ShouldNotGrantAchievement_WhenAlreadyEarned()
        => await Test_EvaluateAsync_ShouldNotGrantAchievement_WhenAlreadyEarned();

    [Fact]
    public async Task GetProgress_ShouldReturnCorrect()
        => await Test_GetProgressAsync(99, Milestone);
}