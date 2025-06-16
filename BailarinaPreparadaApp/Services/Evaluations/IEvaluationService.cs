using BailarinaPreparadaApp.DTOs.Evaluations;

namespace BailarinaPreparadaApp.Services.Evaluations;

public interface IEvaluationService
{
    Task<IEnumerable<EvaluationResponse>> GetEvaluationsAsync();

    Task<IEnumerable<EvaluationResponse>> GetEvaluationsByUserIdAsync(string userId);

    Task<EvaluationResponse?> GetEvaluationByIdAsync(int id, string currentUserId, bool isAdmin);

    Task<(bool Success, string Message, int? EvaluationId)> CreateEvaluationAsync(CreateEvaluationRequest request);

    Task SendEvaluationReadyEmailAsync(int evaluationId);

    Task<(bool Success, string Message)>
        UpdateEvaluationAsync(int id, List<EvaluationExerciseRequest> updatedExercises);

    Task<(bool Success, string Message)> UpdatePhotosUrlAsync(int evaluationId, string photosUrl);

    Task<(bool Success, string Message)> DeleteEvaluationAsync(int id);
}