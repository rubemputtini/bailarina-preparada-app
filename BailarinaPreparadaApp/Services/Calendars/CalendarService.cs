using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Calendars;
using BailarinaPreparadaApp.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace BailarinaPreparadaApp.Services.Calendars
{
    public class CalendarService : ICalendarService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMemoryCache _memoryCache;

        public CalendarService(ApplicationDbContext context, IMemoryCache memoryCache)
        {
            _dbContext = context;
            _memoryCache = memoryCache;
        }

        public async Task<IEnumerable<CalendarSummaryResponse>> GetCalendarSummaryAsync(string userId, DateTime startDate, DateTime endDate)
        {
            var cacheKey = CacheKeys.CalendarSummary(userId, startDate, endDate);
            
            if (_memoryCache.TryGetValue(cacheKey, out IEnumerable<CalendarSummaryResponse> cachedCalendar))
                return cachedCalendar;
            
            var trainings = await _dbContext.Trainings
                .AsNoTracking()
                .Where(t => t.UserId == userId && t.Date >= startDate && t.Date <= endDate)
                .GroupBy(t => t.Date.Date)
                .Select(g => new CalendarSummaryResponse
                {
                    Date = g.Key,
                    TrainingCount = g.Count()
                })
                .ToListAsync();

            var cacheOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromHours(12));
            
            _memoryCache.Set(cacheKey, trainings, cacheOptions);
            
            return trainings;
        }
    }
}
