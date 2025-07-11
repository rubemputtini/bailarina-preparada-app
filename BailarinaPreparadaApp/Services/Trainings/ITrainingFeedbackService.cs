using BailarinaPreparadaApp.DTOs.Trainings;

namespace BailarinaPreparadaApp.Services.Trainings;

public interface ITrainingFeedbackService
{
    Task<(IEnumerable<FeedbackAdminListResponse> Feedbacks, int TotalFeedbacks)> GetPendingFeedbacksAsync(
        int page,  int pageSize, string? searchTerm = null, string? category = null);
    Task MarkAsResolvedAsync(int feedbackId);
    Task ReplyToFeedbackAsync(int feedbackId, FeedbackReplyRequest request);
    Task<IEnumerable<FeedbackUserListResponse>> GetUserFeedbacksAsync(string userId, int page, int pageSize);
    Task AcknowledgeFeedbackAsync(string userId, int feedbackId);
}