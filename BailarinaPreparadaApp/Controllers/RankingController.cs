using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class RankingController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RankingController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetRanking([FromQuery] int? month, int? year)
        {
            var currentDate = DateTime.UtcNow;

            var selectedYear = year ?? currentDate.Year;
            var selectedMonth = month;

            var trainingsQuery = _context.Trainings
                .Include(t => t.User)
                .Where(t => t.Date.Year == selectedYear && t.IsCompleted);

            if (selectedMonth.HasValue)
            {
                trainingsQuery = trainingsQuery.Where(t => t.Date.Month == selectedMonth.Value);
            }

            var trainings = await trainingsQuery.ToListAsync();

            var ranking = trainings
                .GroupBy(t => t.User)
                .Select(g => new RankingResponse
                {
                    UserName = g.Key.Name,
                    Points = g.Count(),
                    DaysTrained = g.Select(t => t.Date.Date).Distinct().Count(),
                    Month = selectedMonth ?? 0,
                    Year = selectedYear
                })
                .OrderByDescending(r => r.Points)
                .ThenByDescending(r => r.DaysTrained)
                .ToList();

            if (ranking.Count == 0)
            {
                return NotFound(selectedMonth.HasValue
            ? $"Nenhum treino encontrado para o mês {selectedMonth} e ano {selectedYear}."
            : $"Nenhum treino encontrado para o ano {selectedYear}.");
            }

            return Ok(ranking);
        }
    }
}
