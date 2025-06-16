using BailarinaPreparadaApp.DTOs.ExerciseReferences;

namespace BailarinaPreparadaApp.Services.ExerciseReferences;

public interface IExerciseReferenceService
{
    Task<IEnumerable<ExerciseReferenceResponse>> GetAllReferencesAsync();

    Task<IEnumerable<ExerciseReferenceResponse>> GetByExerciseIdAsync(int exerciseId);

    Task<IEnumerable<ExerciseReferenceResponse>> GetLevelsForUserAsync(int exerciseId, int age,
        string gender);

    Task<ExerciseReferenceResponse?> GetClassificationForUserAsync(int exerciseId, int age, string gender, int score);
}