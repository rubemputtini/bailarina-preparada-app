using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Calendars;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services.Calendars
{
    public class CalendarService
    {
        private readonly ApplicationDbContext _dbContext;

        public CalendarService(ApplicationDbContext context)
        {
            _dbContext = context;
        }

        public async Task<IEnumerable<CalendarSummaryResponse>> GetCalendarSummaryAsync(string userId, DateTime startDate, DateTime endDate)
        {
            var trainings = await _dbContext.Trainings
                .Where(t => t.UserId == userId && t.Date >= startDate && t.Date <= endDate)
                .GroupBy(t => t.Date.Date)
                .Select(g => new CalendarSummaryResponse
                {
                    Date = g.Key,
                    TrainingCount = g.Count()
                })
                .ToListAsync();

            return trainings;
        }
    }
}
