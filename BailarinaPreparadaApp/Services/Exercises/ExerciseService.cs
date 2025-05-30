using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Exercises;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services.Exercises
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
            var exercises = await _dbContext.Exercises.AsNoTracking().ToListAsync();

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
