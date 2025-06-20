using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.Models.Achievements;
using BailarinaPreparadaApp.Models.Trainings;
using BailarinaPreparadaApp.Services.Achievements;
using BailarinaPreparadaApp.Services.Achievements.AchievementRules.Streaks;
using BailarinaPreparadaApp.Tests.Helpers;
using Moq;

namespace BailarinaPreparadaApp.Tests.Services.Achievements.AchievementRules.Streaks;

public class PerfectWeekRuleTests
{
    private readonly string _userId = TestsHelper.GenerateUserId();
    private static readonly DateTime ReferenceDate = TestDateUtils.GetReferenceDate();
    private readonly DateTime _lastSunday = TestDateUtils.GetLastSunday(ReferenceDate);
    private readonly DateTime _previousMonday = TestDateUtils.GetPreviousMonday(ReferenceDate);

    private async Task<ApplicationDbContext> CreateContextWithTrainingsAsync(params DayOfWeek[] daysOfWeek)
    {
        var context = await TestsHelper.CreateContextWithUserAsync(_userId);
        var user = await context.Users.FindAsync(_userId);

        foreach (var day in daysOfWeek)
        {
            var date = TestDateUtils.GetDateForWeekDay(day, _previousMonday);

            context.Trainings.Add(new Training
            {
                UserId = _userId,
                User = user!,
                Category = "CARDIO",
                Date = date,
                Description = "Treino semanal",
                IsCompleted = true
            });
        }

        await context.SaveChangesAsync();

        return context;
    }

    private (PerfectWeekRule rule, Mock<IAchievementService> mock) CreateRuleWithMock(ApplicationDbContext context)
    {
        var mock = new Mock<IAchievementService>();

        var rule = new PerfectWeekRule(context, new Lazy<IAchievementService>(() => mock.Object));

        return (rule, mock);
    }

    [Fact]
    public async Task EvaluateAsync_ShouldGrantAchievement_WhenAll7DaysTrained()
    {
        var context = await CreateContextWithTrainingsAsync(
            DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday,
            DayOfWeek.Saturday, DayOfWeek.Sunday);

        var (rule, mock) = CreateRuleWithMock(context);

        mock.Setup(s => s.GrantAchievementAsync(_userId, AchievementIds.PerfectWeek, _previousMonday))
            .ReturnsAsync(true).Verifiable();

        await rule.EvaluateAsync(_userId);

        mock.Verify(s => s.GrantAchievementAsync(_userId, AchievementIds.PerfectWeek, _previousMonday), Times.Once);
    }

    [Fact]
    public async Task EvaluateAsync_ShouldNotGrantAchievement_WhenMissingOneDay()
    {
        var context = await CreateContextWithTrainingsAsync(
            DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday,
            DayOfWeek.Saturday);

        var (rule, mock) = CreateRuleWithMock(context);

        await rule.EvaluateAsync(_userId);

        mock.Verify(s => s.GrantAchievementAsync(_userId, AchievementIds.PerfectWeek, _previousMonday), Times.Never);
    }

    [Fact]
    public async Task EvaluateAsync_ShouldNotGrantAchievement_WhenAlreadyEarned()
    {
        var context = await CreateContextWithTrainingsAsync(
            DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday,
            DayOfWeek.Saturday, DayOfWeek.Sunday);

        context.UserAchievements.Add(new UserAchievement
        {
            UserId = _userId,
            AchievementDefinitionId = AchievementIds.PerfectWeek,
            AchievedAt = TestDateUtils.GetDateForWeekDay(DayOfWeek.Tuesday, _previousMonday),
            Sequence = 1,
            ReferenceDate = _previousMonday
        });

        await context.SaveChangesAsync();

        var (rule, mock) = CreateRuleWithMock(context);

        await rule.EvaluateAsync(_userId);

        mock.Verify(s => s.GrantAchievementAsync(_userId, AchievementIds.PerfectWeek, _previousMonday), Times.Never);
    }

    [Fact]
    public async Task EvaluateAsync_ShouldNotGrantAchievement_When7ConsecutiveDays_AcrossTwoWeeks()
    {
        var context = await TestsHelper.CreateContextWithUserAsync(_userId);
        var user = await context.Users.FindAsync(_userId);

        var previousWednesday = _lastSunday.AddDays(-4);

        for (int i = 0; i < 7; i++)
        {
            context.Trainings.Add(new Training
            {
                UserId = _userId,
                User = user!,
                Category = "CARDIO",
                Date = previousWednesday.AddDays(i),
                Description = "Treino semanal",
                IsCompleted = true
            });
        }

        await context.SaveChangesAsync();

        var (rule, mock) = CreateRuleWithMock(context);

        await rule.EvaluateAsync(_userId);

        mock.Verify(s => s.GrantAchievementAsync(_userId, AchievementIds.PerfectWeek, _previousMonday), Times.Never);
    }

    [Fact]
    public async Task EvaluateAsync_ShouldNotGrantAchievement_WhenOneTrainingOutsideWeekRange()
    {
        var context = await TestsHelper.CreateContextWithUserAsync(_userId);
        var user = await context.Users.FindAsync(_userId);

        foreach (var day in new[]
                 {
                     DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday,
                     DayOfWeek.Thursday, DayOfWeek.Friday, DayOfWeek.Saturday
                 })
        {
            var date = TestDateUtils.GetDateForWeekDay(day, _previousMonday);

            context.Trainings.Add(new Training
            {
                UserId = _userId,
                User = user!,
                Category = "CARDIO",
                Date = date,
                Description = "Treino semanal",
                IsCompleted = true
            });
        }

        var mondayNextWeek = TestDateUtils.GetLastSunday(ReferenceDate).AddDays(1);
        
        context.Trainings.Add(new Training
        {
            UserId = _userId,
            User = user!,
            Category = "CARDIO",
            Date = mondayNextWeek,
            Description = "Treino sem conquista",
            IsCompleted = true
        });
        
        await context.SaveChangesAsync();
        
        var (rule, mock) = CreateRuleWithMock(context);
        
        await rule.EvaluateAsync(_userId);
        
        mock.Verify(s => s.GrantAchievementAsync(_userId, AchievementIds.PerfectWeek, _previousMonday), Times.Never);
    }
    
    [Fact]
    public async Task EvaluateAsync_ShouldNotGrantAchievement_Again_WhenTrainingBackdated()
    {
        var previousMonday = new DateTime(2025, 6, 10);

        var context = await TestsHelper.CreateContextWithUserAsync(_userId);
        var user = await context.Users.FindAsync(_userId);

        for (int i = 0; i < 7; i++)
        {
            context.Trainings.Add(new Training
            {
                UserId = _userId,
                User = user!,
                Category = "PBT",
                Date = previousMonday.AddDays(i),
                Description = "Retroativo",
                IsCompleted = true
            });
        }
        
        context.UserAchievements.Add(new UserAchievement
        {
            UserId = _userId,
            AchievementDefinitionId = AchievementIds.PerfectWeek,
            AchievedAt = new DateTime(2025, 6, 19),
            Sequence = 1,
            ReferenceDate = previousMonday
        });

        await context.SaveChangesAsync();

        var (rule, mock) = CreateRuleWithMock(context);

        await rule.EvaluateAsync(_userId);

        mock.Verify(s => s.GrantAchievementAsync(_userId, AchievementIds.PerfectWeek, previousMonday), Times.Never);
    }
}