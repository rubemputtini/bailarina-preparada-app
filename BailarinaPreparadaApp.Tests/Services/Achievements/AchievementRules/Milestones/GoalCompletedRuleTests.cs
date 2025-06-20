using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.Models.Achievements;
using BailarinaPreparadaApp.Models.Users;
using BailarinaPreparadaApp.Services.Achievements;
using BailarinaPreparadaApp.Services.Achievements.AchievementRules.Milestones;
using BailarinaPreparadaApp.Services.Trainings;
using BailarinaPreparadaApp.Tests.Helpers;
using Moq;

namespace BailarinaPreparadaApp.Tests.Services.Achievements.AchievementRules.Milestones;

public class GoalCompletedRuleTests
{
    private readonly string _userId = TestsHelper.GenerateUserId();
    private readonly int _currentYear = TestsHelper.Today.Year;
    private DateTime ReferenceDate => TestDateUtils.GetReferenceFirstDayOfYear(_currentYear);

    private async Task<ApplicationDbContext> CreateContextWithGoalAsync(int goalDays,
        bool alreadyHasAchievement = false)
    {
        var context = await TestsHelper.CreateContextWithUserAsync(_userId);
        var user = await context.Users.FindAsync(_userId);

        context.UserGoals.Add(new UserGoal
        {
            UserId = _userId,
            User = user!,
            Year = _currentYear,
            GoalDays = goalDays
        });

        if (alreadyHasAchievement)
        {
            context.UserAchievements.Add(new UserAchievement
            {
                UserId = _userId,
                User = user!,
                AchievementDefinitionId = AchievementIds.GoalCompleted,
                AchievedAt = ReferenceDate
            });
        }

        await context.SaveChangesAsync();

        return context;
    }

    private (GoalCompletedRule rule, Mock<IAchievementService> achievementMock, Mock<ITrainingService> trainingMock)
        CreateRuleWithMocks(ApplicationDbContext context, int? trainingDays = null)
    {
        var achievementMock = new Mock<IAchievementService>();
        var trainingMock = new Mock<ITrainingService>();

        if (trainingDays.HasValue)
        {
            trainingMock.Setup(t => t.GetYearlyTrainingDaysCountAsync(_userId, _currentYear))
                .ReturnsAsync(trainingDays.Value);
        }

        var rule = new GoalCompletedRule(
            context,
            new Lazy<IAchievementService>(() => achievementMock.Object),
            new Lazy<ITrainingService>(() => trainingMock.Object)
        );

        return (rule, achievementMock, trainingMock);
    }

    [Fact]
    public async Task EvaluateAsync_ShouldGrantAchievement_WhenGoalIsCompleted()
    {
        var goal = 100;
        var actual = 105;

        var context = await CreateContextWithGoalAsync(goal);
        var (rule, achievementMock, trainingMock) = CreateRuleWithMocks(context, actual);

        achievementMock.Setup(a => a.GrantAchievementAsync(_userId, AchievementIds.GoalCompleted, ReferenceDate))
            .ReturnsAsync(true).Verifiable();

        await rule.EvaluateAsync(_userId);

        achievementMock.Verify(a => a.GrantAchievementAsync(_userId, AchievementIds.GoalCompleted, ReferenceDate), Times.Once);
    }

    [Fact]
    public async Task EvaluateAsync_ShouldNotGrantAchievement_WhenGoalIsNotCompleted()
    {
        var goal = 100;
        var actual = 90;

        var context = await CreateContextWithGoalAsync(goal);
        var (rule, achievementMock, trainingMock) = CreateRuleWithMocks(context, actual);

        await rule.EvaluateAsync(_userId);

        achievementMock.Verify(a => a.GrantAchievementAsync(_userId, AchievementIds.GoalCompleted, ReferenceDate), Times.Never);
    }

    [Fact]
    public async Task EvaluateAsync_ShouldNotGrantAchievement_WhenGoalIsZero()
    {
        var context = await CreateContextWithGoalAsync(0);
        var (rule, achievementMock, trainingMock) = CreateRuleWithMocks(context, 365);

        await rule.EvaluateAsync(_userId);

        achievementMock.Verify(a => a.GrantAchievementAsync(_userId, AchievementIds.GoalCompleted, ReferenceDate), Times.Never);
    }

    [Fact]
    public async Task EvaluateAsync_ShouldNotGrantAchievement_WhenGoalAlreadyEarned()
    {
        var goal = 100;
        var actual = 100;

        var context = await CreateContextWithGoalAsync(goal, alreadyHasAchievement: true);
        var (rule, achievementMock, trainingMock) = CreateRuleWithMocks(context, actual);

        achievementMock.Setup(a => a.HasAchievementAsync(_userId, AchievementIds.GoalCompleted, ReferenceDate))
            .ReturnsAsync(true);

        await rule.EvaluateAsync(_userId);

        achievementMock.Verify(a => a.GrantAchievementAsync(_userId, AchievementIds.GoalCompleted, ReferenceDate), Times.Never);
    }

    [Fact]
    public async Task EvaluateAsync_ShouldNotGrantAchievement_WhenUserHasNoGoal()
    {
        var context = await TestsHelper.CreateContextWithUserAsync(_userId);
        var (rule, achievementMock, trainingMock) = CreateRuleWithMocks(context);

        await rule.EvaluateAsync(_userId);

        achievementMock.Verify(a => a.GrantAchievementAsync(_userId, AchievementIds.GoalCompleted, ReferenceDate), Times.Never);
    }
}