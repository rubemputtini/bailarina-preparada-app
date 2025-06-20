using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.Models.Achievements;
using BailarinaPreparadaApp.Models.Trainings;
using BailarinaPreparadaApp.Services.Achievements;
using BailarinaPreparadaApp.Services.Achievements.AchievementRules.Categories;
using BailarinaPreparadaApp.Tests.Helpers;
using FluentAssertions;
using Moq;

namespace BailarinaPreparadaApp.Tests.Services.Achievements.AchievementRules.Categories;

public abstract class CategoryMilestoneRuleTestBase<T> where T : CategoryMilestoneRuleBase
{
    private readonly string _userId = TestsHelper.GenerateUserId();
    protected abstract string Category { get; }
    protected abstract string AchievementId { get; }
    protected abstract int Milestone { get; }

    protected abstract T CreateRule(ApplicationDbContext context, Mock<IAchievementService> achievementMock);

    private async Task<ApplicationDbContext> CreateContextWithTrainingsAsync(int count, bool alreadyEarned = false)
    {
        var context = await TestsHelper.CreateContextWithUserAsync(_userId);
        var user = await context.Users.FindAsync(_userId);

        for (int i = 0; i < count; i++)
        {
            context.Trainings.Add(new Training
            {
                UserId = _userId,
                User = user!,
                Category = Category,
                IsCompleted = true,
                Date = TestsHelper.Today.AddDays(-i)
            });
        }

        if (alreadyEarned)
        {
            context.UserAchievements.Add(new UserAchievement
            {
                UserId = _userId,
                User = user!,
                AchievementDefinitionId = AchievementId,
                AchievedAt = new DateTime(2024, 1, 1)
            });
        }

        await context.SaveChangesAsync();

        return context;
    }

    private (T Rule, Mock<IAchievementService> achievementMock) CreateRuleWithMocks(ApplicationDbContext context)
    {
        var achievementMock = new Mock<IAchievementService>();
        var rule = CreateRule(context, achievementMock);

        return (rule, achievementMock);
    }

    protected async Task Test_EvaluateAsync_ShouldGrantAchievement()
    {
        var context = await CreateContextWithTrainingsAsync(Milestone);
        var (rule, achievementMock) = CreateRuleWithMocks(context);

        achievementMock.Setup(a => a.GrantAchievementAsync(_userId, AchievementId, null))
            .ReturnsAsync(true).Verifiable();

        await rule.EvaluateAsync(_userId);

        achievementMock.Verify(a => a.GrantAchievementAsync(_userId, AchievementId, null), Times.Once);
    }

    protected async Task Test_EvaluateAsync_ShouldNotGrantAchievement()
    {
        var context = await CreateContextWithTrainingsAsync(Milestone - 1);
        var (rule, achievementMock) = CreateRuleWithMocks(context);
        
        await rule.EvaluateAsync(_userId);
        
        achievementMock.Verify(a => a.GrantAchievementAsync(_userId, AchievementId, null), Times.Never);
    }

    protected async Task Test_EvaluateAsync_ShouldNotGrantAchievement_WhenAlreadyEarned()
    {
        var context = await CreateContextWithTrainingsAsync(Milestone * 2, alreadyEarned: true);
        var (rule, achievementMock) = CreateRuleWithMocks(context);
        
        await rule.EvaluateAsync(_userId);
        
        achievementMock.Verify(a => a.GrantAchievementAsync(_userId, AchievementId, null), Times.Never);
    }

    protected async Task Test_GetProgressAsync(int completedTrainings, int expectedGoal, bool alreadyEarned = false)
    {
        var context = await CreateContextWithTrainingsAsync(completedTrainings, alreadyEarned);
        var (rule, achievementMock) = CreateRuleWithMocks(context);
        
        var (current, goal) = await rule.GetProgressAsync(_userId);
        
        current.Should().Be(completedTrainings);
        goal.Should().Be(expectedGoal);
    }
}