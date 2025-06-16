using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Exercises;
using BailarinaPreparadaApp.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace BailarinaPreparadaApp.Services.Exercises
{
    public class ExerciseService : IExerciseService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMemoryCache _memoryCache;

        public ExerciseService(ApplicationDbContext dbContext, IMemoryCache memoryCache)
        {
            _dbContext = dbContext;
            _memoryCache = memoryCache;
        }

        public async Task<IEnumerable<ExerciseResponse>> GetExercisesAsync()
        {
            var cacheKey = CacheKeys.AllExercises;

            if (_memoryCache.TryGetValue(cacheKey, out IEnumerable<ExerciseResponse> cachedExercises))
                return cachedExercises;
            
            var exercises = await _dbContext.Exercises.AsNoTracking().ToListAsync();

            var response = exercises.Select(e => new ExerciseResponse
            {
                ExerciseId = e.ExerciseId,
                Name = e.Name,
                Category = e.ExerciseCategory.ToString(),
                PhotoUrl = e.PhotoUrl,
                VideoUrl = e.VideoUrl,
                IsUnilateral = e.IsUnilateral,
            }).ToList();
                
            var cacheOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromDays(7));
                
            _memoryCache.Set(cacheKey, response, cacheOptions);

            return response;
        }
    }
}
