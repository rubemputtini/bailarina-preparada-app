using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Achievements;
using BailarinaPreparadaApp.Helpers;
using BailarinaPreparadaApp.Models.Achievements;
using BailarinaPreparadaApp.Services.Achievements;
using BailarinaPreparadaApp.Services.Achievements.AchievementRules;
using BailarinaPreparadaApp.Tests.Helpers;
using FluentAssertions;
using Microsoft.Extensions.Caching.Memory;

namespace BailarinaPreparadaApp.Tests.Services.Achievements;

public class AchievementServiceTests
{
    private readonly string _userId = TestsHelper.GenerateUserId();

    private AchievementService CreateService(ApplicationDbContext context, IMemoryCache? cache = null,
        IEnumerable<IAchievementRule>? rules = null)
    {
        return new AchievementService(
            context,
            rules ?? new List<IAchievementRule>(),
            cache ?? TestsHelper.CreateMemoryCache());
    }

    [Fact]
    public async Task GetAchievementsForUser_ShouldReturnAchievementsFromCacheIfExists()
    {
        var cache = TestsHelper.CreateMemoryCache();

        var expected = new List<AchievementResponse> { new AchievementResponse { Title = "Cached" } };
        cache.Set(CacheKeys.UserAchievements(_userId), expected);

        var context = TestsHelper.CreateInMemoryContext();
        var service = CreateService(context, cache: cache);
        
        var result = await service.GetAchievementsForUserAsync(_userId);

        result.Should().BeEquivalentTo(expected);
    }

    [Fact]
    public async Task GrantAchievement_ShouldAddUserAchievement_WhenValid()
    {
        var context = TestsHelper.CreateInMemoryContext();

        var achievementDefinitionId = "TEST_ACHIEVEMENT";
        
        context.AchievementDefinitions.Add(new AchievementDefinition
        {
            AchievementDefinitionId = achievementDefinitionId,
            Title = "Test Achievement",
            Description = "Good Test",
            Icon = "https://www.teste.com",
            IsActive = true
        });
        
        await context.SaveChangesAsync();
        
        var service = CreateService(context);
        
        var result = await service.GrantAchievementAsync(_userId, achievementDefinitionId);

        result.Should().BeTrue();
        context.UserAchievements.Should().ContainSingle(ua => ua.UserId == _userId && ua.AchievementDefinitionId == achievementDefinitionId);
    }
}