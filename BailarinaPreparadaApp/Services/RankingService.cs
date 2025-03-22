using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Ranking;
using BailarinaPreparadaApp.Exceptions;
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

        public async Task<IEnumerable<RankingResponse>> GetRankingAsync(int? month, int? year)
        {
            var currentDate = DateTime.UtcNow;
            var selectedYear = year ?? currentDate.Year;
            var selectedMonth = month;

            var trainingsQuery = _dbContext.Trainings
                .Include(t => t.User)
                .Where(t => t.Date.Year == selectedYear && t.IsCompleted);

            if (selectedMonth.HasValue)
            {
                trainingsQuery = trainingsQuery.Where(t => t.Date.Month == selectedMonth.Value);
            }

            var trainings = await trainingsQuery.ToListAsync();

            if (!trainings.Any())
            {
                return new List<RankingResponse>();
            }

            var ranking = trainings
                .GroupBy(t => t.User)
                .Select(g => new RankingResponse
                {
                    UserId = g.Key.Id,
                    UserName = g.Key.Name,
                    TrainingsCompleted = g.Count(),
                    DaysTrained = g.Select(t => t.Date.Date).Distinct().Count(),
                    Month = selectedMonth ?? 0,
                    Year = selectedYear
                })
                .OrderByDescending(r => r.TrainingsCompleted)
                .ThenByDescending(r => r.DaysTrained)
                .ToList();

            return ranking;
        }
    }
}
