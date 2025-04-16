using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Trainings;
using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Models.Trainings;
using BailarinaPreparadaApp.Services.Achievements;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services.Trainings
{
    public class TrainingService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly AchievementService _achievementService;

        public TrainingService(ApplicationDbContext dbContext, AchievementService achievementService)
        {
            _dbContext = dbContext;
            _achievementService = achievementService;
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
            var trainingDaysCount = await _dbContext.Trainings
                .Where(t => t.UserId == userId && t.IsCompleted && t.Date.Year == year)
                .Select(t => t.Date.Date)
                .Distinct()
                .CountAsync();

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
        }
    }
}
