using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Trainings;
using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Models.Trainings;
using BailarinaPreparadaApp.Services.Achievements;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace BailarinaPreparadaApp.Services.Trainings
{
    public class TrainingService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly AchievementService _achievementService;
        private readonly IMemoryCache _memoryCache;

        public TrainingService(ApplicationDbContext dbContext, AchievementService achievementService, IMemoryCache memoryCache)
        {
            _dbContext = dbContext;
            _achievementService = achievementService;
            _memoryCache = memoryCache;
        }

        public async Task CreateTrainingAsync(string userId, CreateTrainingRequest request)
        {
            if (request.Date.Date > DateTime.UtcNow.Date)
            {
                throw new ValidationException("Não é possível registrar treinos em datas futuras.");
            }

            var user = await _dbContext.Users.FindAsync(userId);

            var training = new Training
            {
                User = user!,
                UserId = user!.Id,
                Date = request.Date,
                Category = request.Category,
                Description = request.Description,
                IsCompleted = true
            };

            _dbContext.Trainings.Add(training);
            await _dbContext.SaveChangesAsync();
            
            _memoryCache.Remove($"yearly_training_days_count_{userId}_{request.Date.Year}");
            InvalidateUserCalendarCache(userId, request.Date);
            InvalidateRankingCache(request.Date.Month, request.Date.Year);
            
            await _achievementService.EvaluateAllRulesAsync(userId);
        }

        public async Task<IEnumerable<TrainingResponse>> GetCompletedTrainingsAsync(string userId, DateTime? startDate, DateTime? endDate, string? category)
        {
            var trainingsQuery = _dbContext.Trainings
                .Where(t => t.UserId == userId && t.IsCompleted)
                .AsQueryable();

            if (startDate.HasValue)
            {
                trainingsQuery = trainingsQuery.Where(t => t.Date >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                trainingsQuery = trainingsQuery.Where(t => t.Date <= endDate.Value);
            }

            if (!string.IsNullOrEmpty(category))
            {
                trainingsQuery = trainingsQuery.Where(t => t.Category == category);
            }

            var trainings = await trainingsQuery
                .AsNoTracking()
                .Select(t => new TrainingResponse
                {
                    TrainingId = t.TrainingId,
                    Date = t.Date,
                    Description = t.Description,
                    Category = t.Category
                })
                .OrderByDescending(t => t.Date)
                .ToListAsync();

            return trainings;
        }

        public async Task<int> GetYearlyTrainingDaysCountAsync(string userId, int year)
        {
            var cacheKey = $"yearly_training_days_count_{userId}_{year}";
            
            if (_memoryCache.TryGetValue(cacheKey, out int cachedTrainingDaysCount))
                return cachedTrainingDaysCount;
            
            var trainingDaysCount = await _dbContext.Trainings
                .AsNoTracking()
                .Where(t => t.UserId == userId && t.IsCompleted && t.Date.Year == year)
                .Select(t => t.Date.Date)
                .Distinct()
                .CountAsync();

            var cacheOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromHours(12));
            
            _memoryCache.Set(cacheKey, trainingDaysCount, cacheOptions);

            return trainingDaysCount;
        }

        public async Task DeleteTrainingAsync(string userId, int trainingId)
        {
            var training = await _dbContext.Trainings
                .SingleOrDefaultAsync(t => t.TrainingId == trainingId && t.UserId == userId);

            if (training == null)
            {
                throw new NotFoundException("Treino não encontrado.");
            }

            _dbContext.Trainings.Remove(training);
            await _dbContext.SaveChangesAsync();
            
            _memoryCache.Remove($"yearly_training_days_count_{userId}_{training.Date.Year}");
            InvalidateUserCalendarCache(userId, training.Date);
            InvalidateRankingCache(training.Date.Month, training.Date.Year);
        }

        private void InvalidateUserCalendarCache(string userId, DateTime date)
        {
            var monthStart = new DateTime(date.Year, date.Month, 1);
            var monthEnd = monthStart.AddMonths(1).AddDays(-1);
            
            var cacheKey = $"calendar_summary_{userId}_{monthStart:yyyyMMdd}_{monthEnd:yyyyMMdd}";
            
            _memoryCache.Remove(cacheKey);
        }

        private void InvalidateRankingCache(int month, int year)
        {
            _memoryCache.Remove($"ranking_{month}_{year}");
            _memoryCache.Remove($"ranking_0_{year}"); // Ranking Anual
        }
    }
}
