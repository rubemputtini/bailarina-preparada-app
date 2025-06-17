using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Trainings;
using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Helpers;
using BailarinaPreparadaApp.Models.Addresses;
using BailarinaPreparadaApp.Models.Trainings;
using BailarinaPreparadaApp.Models.Users;
using BailarinaPreparadaApp.Services.Achievements;
using BailarinaPreparadaApp.Services.Trainings;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Moq;

namespace BailarinaPreparadaApp.Tests.Services.Trainings;

public class TrainingServiceTests
{
    private readonly string _userId = Guid.NewGuid().ToString();
    private readonly DateTime _today = DateTime.Today;

    private readonly CreateTrainingRequest _validRequest = new CreateTrainingRequest
    {
        Category = "CARDIO",
        Date = DateTime.Today,
        Description = "Difícil!"
    };

    private static DbContextOptions<ApplicationDbContext> GetDbContextOptions()
        => new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase("TestDb_" + Guid.NewGuid())
            .Options;

    private static User CreateFakeUser(string userId, string name)
    {
        var user = new User
        {
            Id = userId,
            Name = name,
            DateOfBirth = DateTime.Today.AddYears(-20),
            Address = new Address
            {
                UserId = userId,
                Street = "Rua X",
                Number = "123",
                City = "Cidade",
                State = "Estado",
                Country = "Brasil",
                PostalCode = "12345-678"
            }
        };

        user.Address.User = user;
        
        return user;
    }

    private async Task<ApplicationDbContext> CreateContextWithUserAsync(string userId)
    {
        var context = new ApplicationDbContext(GetDbContextOptions());
        context.Users.Add(CreateFakeUser(userId, "User Test"));

        await context.SaveChangesAsync();

        return context;
    }

    private TrainingService CreateService(ApplicationDbContext context, IMemoryCache? memoryCache = null, IAchievementService? achievementService = null)
    {
        return new TrainingService(
            context,
            achievementService ?? new Mock<IAchievementService>().Object,
            memoryCache ?? new MemoryCache(new MemoryCacheOptions()));
    }

    [Fact]
    public async Task CreateTraining_ShouldThrow_WhenDateIsFuture()
    {
        var context = await CreateContextWithUserAsync(_userId);
        var service = CreateService(context);

        var futureRequest = new CreateTrainingRequest { Category = "CARDIO", Date = _today.AddDays(1) };

        var act = async () => await service.CreateTrainingAsync(_userId, futureRequest);

        await act.Should().ThrowAsync<ValidationException>()
            .WithMessage("Não é possível registrar treinos em datas futuras.");
    }

    [Fact]
    public async Task CreateTraining_ShouldSaveTrainingToDatabase_WhenInputIsValid()
    {
        var context = await CreateContextWithUserAsync(_userId);
        var service = CreateService(context);

        await service.CreateTrainingAsync(_userId, _validRequest);

        var training = await context.Trainings.FirstOrDefaultAsync(t => t.UserId == _userId);

        training.Should().NotBeNull();
        training.Date.Should().Be(_validRequest.Date);
    }

    [Fact]
    public async Task CreateTraining_ShouldCallAchievementEvaluation()
    {
        var context = await CreateContextWithUserAsync(_userId);
        var mockAchievementService = new Mock<IAchievementService>();
        var service = CreateService(context, achievementService: mockAchievementService.Object);

        await service.CreateTrainingAsync(_userId, _validRequest);

        mockAchievementService.Verify(s => s.EvaluateAllRulesAsync(_userId), Times.Once);
    }

    [Fact]
    public async Task CreateTraining_ShouldInvalidateExpectedCacheKeys()
    {
        var context = await CreateContextWithUserAsync(_userId);

        var memoryCache = new Mock<IMemoryCache>();
        memoryCache.Setup(c => c.Remove(It.IsAny<object>()));

        var date = new DateTime(2025, 6, 16);
        var request = new CreateTrainingRequest { Category = "CARDIO", Date = date, Description = "Teste" };
        var service = CreateService(context, memoryCache: memoryCache.Object);

        await service.CreateTrainingAsync(_userId, request);

        memoryCache.Verify(c => c.Remove(CacheKeys.YearlyTrainingDaysCount(_userId, date.Year)), Times.Once);
        memoryCache.Verify(c => c.Remove(CacheKeys.UserAchievements(_userId)), Times.Once);

        var monthStart = new DateTime(date.Year, date.Month, 1);
        var monthEnd = monthStart.AddMonths(1).AddDays(-1);
        memoryCache.Verify(c => c.Remove(CacheKeys.CalendarSummary(_userId, monthStart, monthEnd)), Times.Once);

        memoryCache.Verify(c => c.Remove(CacheKeys.Ranking(date.Month, date.Year)), Times.Once);
        memoryCache.Verify(c => c.Remove(CacheKeys.RankingAnnual(date.Year)), Times.Once);
    }

    [Fact]
    public async Task GetCompletedTrainings_ShouldReturnTrainingsWithDateRange()
    {
        var context = await CreateContextWithUserAsync(_userId);
        var user = await context.Users.FindAsync(_userId);
        var service = CreateService(context);

        context.Trainings.AddRange(
            new Training
            {
                UserId = _userId,
                User = user!,
                Date = _today.AddDays(-3),
                Category = "FORÇA",
                Description = "Antigo",
                IsCompleted = true
            },
            new Training
            {
                UserId = _userId,
                User = user!,
                Date = _today,
                Category = "FORÇA",
                Description = "Hoje",
                IsCompleted = true
            },
            new Training
            {
                UserId = _userId,
                User = user!,
                Date = _today.AddDays(-10),
                Category = "FORÇA",
                Description = "Muito antigo",
                IsCompleted = true
            }
        );

        await context.SaveChangesAsync();

        var result = await service.GetCompletedTrainingsAsync(_userId, _today.AddDays(-5), _today, null);

        result.Should().HaveCount(2);
    }

    [Fact]
    public async Task GetYearlyTrainingDaysCount_ShouldCountDistinctDaysOnly()
    {
        var context = await CreateContextWithUserAsync(_userId);
        var user = await context.Users.FindAsync(_userId);

        context.Trainings.AddRange(
            new Training
            {
                UserId = _userId,
                User = user!,
                Date = _today,
                Category = "FORÇA",
                Description = "Manhã",
                IsCompleted = true
            },
            new Training
            {
                UserId = _userId,
                User = user!,
                Date = _today,
                Category = "CARDIO",
                Description = "Noite",
                IsCompleted = true
            },
            new Training
            {
                UserId = _userId,
                User = user!,
                Date = _today.AddDays(-1),
                Category = "PBT",
                Description = "Outro dia",
                IsCompleted = true
            }
        );

        await context.SaveChangesAsync();

        var service = CreateService(context);

        var result = await service.GetYearlyTrainingDaysCountAsync(_userId, _today.Year);

        result.Should().Be(2);
    }
}