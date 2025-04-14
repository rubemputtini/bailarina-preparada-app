using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.ExerciseReferences;
using BailarinaPreparadaApp.Models.ExerciseReferences;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services.ExerciseReferences
{
    public class ExerciseReferenceService
    {
        private readonly ApplicationDbContext _dbContext;

        public ExerciseReferenceService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<ExerciseReferenceResponse>> GetAllReferencesAsync()
        {
            var references = await _dbContext.ExerciseReferences
                .AsNoTracking()
                .ToListAsync();          

            var response = references.Select(MapToDto);

            return response;
        }

        public async Task<IEnumerable<ExerciseReferenceResponse>> GetByExerciseIdAsync(int exerciseId)
        {
            var references = await _dbContext.ExerciseReferences
                .AsNoTracking()
                .Where(er => er.ExerciseId == exerciseId)
                .OrderBy(er => er.MinAge)
                .ThenBy(er => er.Gender)
                .ToListAsync();

            var response = references.Select(MapToDto);

            return response;
        }

        public async Task<ExerciseReferenceResponse?> GetClassificationForUserAsync(int exerciseId, int age, string gender, int score)
        {
            var references = await _dbContext.ExerciseReferences
                .AsNoTracking()
                .Where(er =>
                    er.ExerciseId == exerciseId &&
                    er.Gender.ToUpper() == gender.ToUpper() &&
                    age >= er.MinAge &&
                    age <= er.MaxAge &&
                    score >= er.MinValue &&
                    (er.MaxValue == null || score <= er.MaxValue)
                )
                .FirstOrDefaultAsync();

            if (references == null)
            {
                return null;
            }

            var response = MapToDto(references);

            return response;
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
