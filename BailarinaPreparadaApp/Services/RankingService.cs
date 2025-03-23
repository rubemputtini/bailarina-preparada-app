using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Ranking;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services
{
    public class RankingService
    {
        private readonly ApplicationDbContext _dbContext;

        public RankingService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<RankingResponse>> GetRankingAsync(int? month, int? year, int? limit = null)
        {
            var currentDate = DateTime.UtcNow;
            var selectedYear = year ?? currentDate.Year;
            var selectedMonth = month;

            var trainingsQuery = _dbContext.Trainings
                .Where(t => t.Date.Year == selectedYear && t.IsCompleted);

            if (selectedMonth.HasValue)
            {
                trainingsQuery = trainingsQuery.Where(t => t.Date.Month == selectedMonth.Value);
            }

            var ranking = await trainingsQuery
                .GroupBy(t => new { t.UserId, t.User.Name })
                .Select(g => new RankingResponse
                {
                    UserId = g.Key.UserId,
                    UserName = g.Key.Name,
                    TrainingsCompleted = g.Count(),
                    DaysTrained = g.Select(t => t.Date.Date).Distinct().Count(),
                    Month = selectedMonth ?? 0,
                    Year = selectedYear
                })
                .OrderByDescending(r => r.DaysTrained)
                .ThenByDescending(r => r.TrainingsCompleted)
                .Take(limit ?? int.MaxValue)
                .ToListAsync();

            return ranking;
        }
    }
}
