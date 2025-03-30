using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Exercise;
using BailarinaPreparadaApp.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services
{
    public class ExerciseService
    {
        private readonly ApplicationDbContext _dbContext;

        public ExerciseService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<ExerciseResponse>> GetExercisesAsync()
        {
            var exercises = await _dbContext.Exercises.ToListAsync();

            if (!exercises.Any())
            {
                return new List<ExerciseResponse>();
            }

            var response = exercises.Select(e => new ExerciseResponse
            {
                ExerciseId = e.ExerciseId,
                Name = e.Name,
                Category = e.ExerciseCategory.ToString(),
                PhotoUrl = e.PhotoUrl,
                VideoUrl = e.VideoUrl,
                IsUnilateral = e.IsUnilateral,
            });

            return response;
        }
    }
}
