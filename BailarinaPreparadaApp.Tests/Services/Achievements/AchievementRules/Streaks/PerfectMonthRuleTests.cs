using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.Models.Achievements;
using BailarinaPreparadaApp.Models.Trainings;
using BailarinaPreparadaApp.Services.Achievements;
using BailarinaPreparadaApp.Services.Achievements.AchievementRules.Streaks;
using BailarinaPreparadaApp.Tests.Helpers;
using Moq;

namespace BailarinaPreparadaApp.Tests.Services.Achievements.AchievementRules.Streaks;

public class PerfectMonthRuleTests
{
    private readonly string _userId = TestsHelper.GenerateUserId();
    private static readonly DateTime ReferenceDate = TestDateUtils.GetReferenceDate();
    private readonly DateTime _firstDayOfMonth = new(ReferenceDate.Year, ReferenceDate.Month, 1);

    private readonly DateTime _lastDayOfMonth = new(ReferenceDate.Year, ReferenceDate.Month,
        DateTime.DaysInMonth(ReferenceDate.Year, ReferenceDate.Month));

    private async Task<ApplicationDbContext> CreateContextWithTrainingsAsync(IEnumerable<int> days)
    {
        var context = await TestsHelper.CreateContextWithUserAsync(_userId);
        var user = await context.Users.FindAsync(_userId);

        foreach (var day in days)
        {
            context.Trainings.Add(new Training
            {
                UserId = _userId,
                User = user!,
                Category = "CARDIO",
                Date = new DateTime(_firstDayOfMonth.Year, _firstDayOfMonth.Month, day),
                Description = "Treino mensal",
                IsCompleted = true
            });
        }

        await context.SaveChangesAsync();

        return context;
    }

    private (PerfectMonthRule rule, Mock<IAchievementService> mock) CreateRuleWithMock(ApplicationDbContext context)
    {
        var mock = new Mock<IAchievementService>();

        var rule = new PerfectMonthRule(context, new Lazy<IAchievementService>(() => mock.Object));

        return (rule, mock);
    }

    [Fact]
    public async Task EvaluateAsync_ShouldGrantAchievement_WhenAllDaysTrained()
    {
        var allDays = Enumerable.Range(1, _lastDayOfMonth.Day);

        var context = await CreateContextWithTrainingsAsync(allDays);

        var (rule, mock) = CreateRuleWithMock(context);
        mock.Setup(s => s.GrantAchievementAsync(_userId, AchievementIds.PerfectMonth))
            .ReturnsAsync(true).Verifiable();

        await rule.EvaluateAsync(_userId);

        mock.Verify(s => s.GrantAchievementAsync(_userId, AchievementIds.PerfectMonth), Times.Once);
    }

    [Fact]
    public async Task EvaluateAsync_ShouldNotGrantAchievement_WhenMissingOneDay()
    {
        var days = Enumerable.Range(1, _lastDayOfMonth.Day - 1);

        var context = await CreateContextWithTrainingsAsync(days);

        var (rule, mock) = CreateRuleWithMock(context);

        await rule.EvaluateAsync(_userId);

        mock.Verify(s => s.GrantAchievementAsync(_userId, AchievementIds.PerfectMonth), Times.Never);
    }

    [Fact]
    public async Task EvaluateAsync_ShouldNotGrantAchievement_WhenAlreadyEarned()
    {
        var allDays = Enumerable.Range(1, _lastDayOfMonth.Day);

        var context = await CreateContextWithTrainingsAsync(allDays);

        context.UserAchievements.Add(new UserAchievement
        {
            UserId = _userId,
            AchievementDefinitionId = AchievementIds.PerfectMonth,
            AchievedAt = _firstDayOfMonth,
            Sequence = 1
        });
        
        await context.SaveChangesAsync();
        
        var (rule, mock) = CreateRuleWithMock(context);
        
        await rule.EvaluateAsync(_userId);
        
        mock.Verify(s => s.GrantAchievementAsync(_userId, AchievementIds.PerfectMonth), Times.Never);
    }

    [Fact]
    public async Task EvaluateAsync_ShouldNotGrantAchievement_When30ConsecutiveDaysAcrossTwoMonths()
    {
        var context = await TestsHelper.CreateContextWithUserAsync(_userId);
        var user = await context.Users.FindAsync(_userId);

        var startDate = _firstDayOfMonth.AddDays(-7);

        for (int i = 0; i < 30; i++)
        {
            context.Trainings.Add(new Training
            {
                UserId = _userId,
                User = user!,
                Category = "CARDIO",
                Date = startDate.AddDays(i),
                Description = "Treino consecutivo",
                IsCompleted = true
            });
        }
        
        await context.SaveChangesAsync();
        
        var (rule, mock) = CreateRuleWithMock(context);
        
        await rule.EvaluateAsync(_userId);
        
        mock.Verify(s => s.GrantAchievementAsync(_userId, AchievementIds.PerfectMonth), Times.Never);
    }
}