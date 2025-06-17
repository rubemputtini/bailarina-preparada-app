using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.Models.Addresses;
using BailarinaPreparadaApp.Models.Users;
using BailarinaPreparadaApp.Services.Achievements;
using BailarinaPreparadaApp.Services.Trainings;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Moq;

namespace BailarinaPreparadaApp.Tests.Helpers;

public static class TestsHelper
{
    public static string GenerateUserId() => Guid.NewGuid().ToString();

    public static DateTime Today => DateTime.Today;

    public static ApplicationDbContext CreateInMemoryContext()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase("TestDB_" + Guid.NewGuid())
            .Options;

        return new ApplicationDbContext(options);
    }

    public static IMemoryCache CreateMemoryCache() => new MemoryCache(new MemoryCacheOptions());

    public static User CreateFakeUser(string userId, string name = "Test User")
    {
        var user = new User
        {
            Id = userId,
            Name = name,
            DateOfBirth = Today.AddYears(-25),
            Address = new Address
            {
                UserId = userId,
                Street = "Rua Teste",
                Number = "123",
                City = "Cidade",
                State = "Estado",
                Country = "Brasil",
                PostalCode = "00000-000"
            }
        };

        user.Address.User = user;
        return user;
    }

    public static async Task<ApplicationDbContext> CreateContextWithUserAsync(string userId, string name = "Test User")
    {
        var context = CreateInMemoryContext();
        var user = CreateFakeUser(userId, name);

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return context;
    }

    public static TrainingService CreateTrainingService(ApplicationDbContext context, IMemoryCache? cache = null,
        IAchievementService? achievement = null)
    {
        return new TrainingService(
            context,
            achievement ?? new Mock<IAchievementService>().Object,
            cache ?? CreateMemoryCache()
        );
    }
}