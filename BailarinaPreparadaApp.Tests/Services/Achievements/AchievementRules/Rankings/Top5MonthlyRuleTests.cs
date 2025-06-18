using BailarinaPreparadaApp.Constants;
using BailarinaPreparadaApp.DTOs.Rankings;
using BailarinaPreparadaApp.Services.Achievements;
using BailarinaPreparadaApp.Services.Achievements.AchievementRules.Rankings;
using BailarinaPreparadaApp.Services.Rankings;
using BailarinaPreparadaApp.Tests.Helpers;
using Moq;

namespace BailarinaPreparadaApp.Tests.Services.Achievements.AchievementRules.Rankings;

public class Top5MonthlyRuleTests
{
    private readonly string _userId = TestsHelper.GenerateUserId();
    private static readonly DateTime ReferenceDate = TestDateUtils.GetReferenceDate();
    private static readonly DateTime PreviousMonth = TestDateUtils.GetPreviousMonth(ReferenceDate);

    private (Top5MonthlyRule rule, Mock<IAchievementService> achievementMock, Mock<IRankingService> rankingMock)
        CreateRuleWithMocks(List<RankingResponse> ranking)
    {
        var achievementMock = new Mock<IAchievementService>();
        var rankingMock = new Mock<IRankingService>();

        rankingMock.Setup(r => r.GetRankingAsync(PreviousMonth.Month, PreviousMonth.Year, 5))
            .ReturnsAsync(ranking);
        
        var rule = new Top5MonthlyRule(rankingMock.Object, new Lazy<IAchievementService>(() => achievementMock.Object));
        
        return (rule, achievementMock, rankingMock);
    }

    [Fact]
    public async Task EvaluateAsync_ShouldGrantAchievement_WhenUserIsTop5()
    {
        var ranking = new List<RankingResponse> { new() { UserId = _userId } };
        
        var (rule, achievementMock, rankingMock) = CreateRuleWithMocks(ranking);

        achievementMock.Setup(a =>
                a.HasAchievementAsync(_userId, AchievementIds.Top5Monthly, PreviousMonth.Year, PreviousMonth.Month))
            .ReturnsAsync(false);
        
        achievementMock.Setup(a => a.GrantAchievementAsync(_userId, AchievementIds.Top5Monthly))
            .ReturnsAsync(true).Verifiable();
        
        await rule.EvaluateAsync(_userId);
        
        achievementMock.Verify(a => a.GrantAchievementAsync(_userId, AchievementIds.Top5Monthly), Times.Once);
    }
    
    [Fact]
    public async Task EvaluateAsync_ShouldNotGrantAchievement_WhenUserIsNotTop5()
    {
        var ranking = new List<RankingResponse> { new() { UserId = "another-user" } };
        
        var (rule, achievementMock, rankingMock) = CreateRuleWithMocks(ranking);
        
        await rule.EvaluateAsync(_userId);
        
        achievementMock.Verify(a => a.GrantAchievementAsync(It.IsAny<string>(), It.IsAny<string>()), Times.Never);
    }
    
    [Fact]
    public async Task EvaluateAsync_ShouldNotGrantAchievement_WhenAlreadyEarned()
    {
        var ranking = new List<RankingResponse> { new() { UserId = _userId } };
        
        var (rule, achievementMock, rankingMock) = CreateRuleWithMocks(ranking);
        
        achievementMock.Setup(a => a.HasAchievementAsync(_userId, AchievementIds.Top5Monthly, PreviousMonth.Year, PreviousMonth.Month))
            .ReturnsAsync(true);
        
        await rule.EvaluateAsync(_userId);
        
        achievementMock.Verify(a => a.GrantAchievementAsync(_userId, AchievementIds.Top5Monthly), Times.Never);
    }
}