using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.ExerciseReferences;
using BailarinaPreparadaApp.Helpers;
using BailarinaPreparadaApp.Models.ExerciseReferences;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace BailarinaPreparadaApp.Services.ExerciseReferences
{
    public class ExerciseReferenceService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMemoryCache _memoryCache;

        public ExerciseReferenceService(ApplicationDbContext dbContext, IMemoryCache memoryCache)
        {
            _dbContext = dbContext;
            _memoryCache = memoryCache;
        }

        public async Task<IEnumerable<ExerciseReferenceResponse>> GetAllReferencesAsync()
        {
            var references = await GetAllReferencesCachedAsync();
            
            var response = references.Select(MapToDto);

            return response;
        }

        public async Task<IEnumerable<ExerciseReferenceResponse>> GetByExerciseIdAsync(int exerciseId)
        {
            var references = await GetAllReferencesCachedAsync();
            
            var response = references
                .Where(er => er.ExerciseId == exerciseId)
                .OrderBy(er => er.MinAge)
                .ThenBy(er => er.Gender)
                .Select(MapToDto);

            return response;
        }

        public async Task<IEnumerable<ExerciseReferenceResponse>> GetLevelsForUserAsync(int exerciseId, int age,
            string gender)
        {
            var references = await GetAllReferencesCachedAsync();

            var filtered = references
                .Where(er =>
                    er.ExerciseId == exerciseId &&
                    string.Equals(er.Gender, gender, StringComparison.CurrentCultureIgnoreCase) &&
                    age >= er.MinAge &&
                    age <= er.MaxAge)
                .OrderBy(er => er.MinValue);
            
            var response = filtered.Select(MapToDto);
            
            return response;
        }
        
        public async Task<ExerciseReferenceResponse?> GetClassificationForUserAsync(int exerciseId, int age, string gender, int score)
        {
            var references = await GetAllReferencesCachedAsync();
            
            var match =  references.FirstOrDefault(er =>
                    er.ExerciseId == exerciseId &&
                    string.Equals(er.Gender, gender, StringComparison.CurrentCultureIgnoreCase) &&
                    age >= er.MinAge &&
                    age <= er.MaxAge &&
                    score >= er.MinValue &&
                    (er.MaxValue == null || score <= er.MaxValue)
                    );

            var response = match == null ? null : MapToDto(match);

            return response;
        }
        
        private async Task<List<ExerciseReference>> GetAllReferencesCachedAsync()
        {
            var cacheKey = CacheKeys.AllExerciseReferences;
            
            if (_memoryCache.TryGetValue(cacheKey, out List<ExerciseReference> cachedReferences))
                return cachedReferences;
            
            var references = await _dbContext.ExerciseReferences
                .AsNoTracking()
                .ToListAsync();
            
            var cacheOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromDays(7));
                
            _memoryCache.Set(cacheKey, references, cacheOptions);
            
            return references;
        }
        
        private static ExerciseReferenceResponse MapToDto(ExerciseReference e) => new()
        {
            ExerciseReferenceId = e.ExerciseReferenceId,
            ExerciseId = e.ExerciseId,
            MinAge = e.MinAge,
            MaxAge = e.MaxAge,
            Gender = e.Gender,
            MinValue = e.MinValue,
            MaxValue = e.MaxValue,
            Classification = e.Classification,
            Source = e.Source
        };
    }
}
