using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Training;
using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services
{
    public class TrainingService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<User> _userManager;

        public TrainingService(ApplicationDbContext dbContext, UserManager<User> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        public async Task CreateTrainingAsync(string userId, CreateTrainingRequest request)
        {
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
        }

        public async Task<IEnumerable<TrainingResponse>> GetCompletedTrainingsAsync(string userId, DateTime? startDate, DateTime? endDate, string? category)
        {
            var user = await _userManager.FindByIdAsync(userId);

            var trainingsQuery = _dbContext.Trainings
                .Where(t => t.UserId == user!.Id && t.IsCompleted)
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
            var user = await _userManager.FindByIdAsync(userId);

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
