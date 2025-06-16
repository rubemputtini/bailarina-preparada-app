using BailarinaPreparadaApp.DTOs.Exercises;

namespace BailarinaPreparadaApp.Services.Exercises;

public interface IExerciseService
{
    Task<IEnumerable<ExerciseResponse>> GetExercisesAsync();
}