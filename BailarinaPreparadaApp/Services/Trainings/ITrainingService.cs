using BailarinaPreparadaApp.DTOs.Trainings;

namespace BailarinaPreparadaApp.Services.Trainings;

public interface ITrainingService
{
    Task CreateTrainingAsync(string userId, CreateTrainingRequest request);

    Task<IEnumerable<TrainingResponse>> GetCompletedTrainingsAsync(string userId, DateTime? startDate,
        DateTime? endDate, string? category);

    Task<int> GetYearlyTrainingDaysCountAsync(string userId, int year);

    Task DeleteTrainingAsync(string userId, int trainingId);
}