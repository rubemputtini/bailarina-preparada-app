using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Rankings;
using BailarinaPreparadaApp.DTOs.Achievements;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace BailarinaPreparadaApp.Services.Rankings
{
    public class RankingService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMemoryCache _memoryCache;

        public RankingService(ApplicationDbContext dbContext, IMemoryCache memoryCache)
        {
            _dbContext = dbContext;
            _memoryCache = memoryCache;
        }

        public async Task<IEnumerable<RankingResponse>> GetRankingAsync(int? month, int? year, int? limit = null)
        {
            var currentDate = DateTime.UtcNow;
            var selectedYear = year ?? currentDate.Year;
            var selectedMonth = month;
            var cacheMonth = selectedMonth ?? 0;

            var cacheKey = $"ranking_{cacheMonth}_{selectedYear}";
            
            if (_memoryCache.TryGetValue(cacheKey, out IEnumerable<RankingResponse> cachedRanking))
                return cachedRanking;

            var trainingsQuery = _dbContext.Trainings
                .AsNoTracking()
                .Where(t => t.IsCompleted && t.Date.Year == selectedYear);

            if (selectedMonth.HasValue)
                trainingsQuery = trainingsQuery.Where(t => t.Date.Month == selectedMonth.Value);

            var groupedData = await trainingsQuery
                .GroupBy(t => new { t.UserId, t.User.Name })
                .Select(g => new
                {
                    g.Key.UserId,
                    Name = g.Key.Name,
                    TrainingsCompleted = g.Count(),
                    DaysTrained = g.Select(t => t.Date.Date).Distinct().Count(),
                })
                .OrderByDescending(g => g.DaysTrained)
                .ThenByDescending(g => g.TrainingsCompleted)
                .Take(limit ?? int.MaxValue)
                .ToListAsync();

            var userIds = groupedData.Select(g => g.UserId).ToList();

            var achievements = await _dbContext.UserAchievements
                .AsNoTracking()
                .Where(ua => userIds.Contains(ua.UserId) && ua.AchievementDefinition.IsActive)
                .Include(ua => ua.AchievementDefinition)
                .ToListAsync();

            var achievementsByUser = achievements
                .GroupBy(a => a.UserId)
                .ToDictionary(
                    g => g.Key,
                    g => g
                        .GroupBy(a => a.AchievementDefinitionId)
                        .Select(grp =>
                        {
                            var first = grp.OrderByDescending(a => a.AchievedAt).First();
                            return new AchievementResponse
                            {
                                AchievementId = first.AchievementDefinitionId,
                                Title = first.AchievementDefinition!.Title,
                                Description = first.AchievementDefinition.Description,
                                Icon = first.AchievementDefinition.Icon,
                                Unlocked = true,
                                AchievedAt = first.AchievedAt,
                                TimesAchieved = grp.Count()
                            };
                        }).ToList()
                );

            var result = groupedData.Select(g => new RankingResponse
            {
                UserId = g.UserId,
                UserName = g.Name,
                TrainingsCompleted = g.TrainingsCompleted,
                DaysTrained = g.DaysTrained,
                Month = selectedMonth ?? 0,
                Year = selectedYear,
                Achievements = achievementsByUser.ContainsKey(g.UserId) ? achievementsByUser[g.UserId] : new List<AchievementResponse>()
            }).ToList();

            var cacheOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromDays(1));
            
            _memoryCache.Set(cacheKey, result, cacheOptions);

            return result;
        }
    }
}