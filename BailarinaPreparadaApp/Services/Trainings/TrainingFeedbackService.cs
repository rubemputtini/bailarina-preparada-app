using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs.Trainings;
using BailarinaPreparadaApp.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Services.Trainings;

public class TrainingFeedbackService : ITrainingFeedbackService
{
    private readonly ApplicationDbContext _dbContext;

    public TrainingFeedbackService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<FeedbackAdminListResponse>> GetPendingFeedbacksAsync(int page = 1, int pageSize = 10)
    {
        var feedbacks = await _dbContext.TrainingFeedbacks
            .AsNoTracking()
            .Include(f => f.Training)
            .ThenInclude(t => t.User)
            .Where(f =>
                !f.IsResolvedByAdmin &&
                string.IsNullOrEmpty(f.AdminMessage) &&
                !string.IsNullOrEmpty(f.Training.Description))
            .OrderByDescending(f => f.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var response = feedbacks.Select(f => new FeedbackAdminListResponse
        {
            FeedbackId = f.TrainingFeedbackId,
            UserName = f.Training.User.Name,
            TrainingDate = f.Training.Date,
            Observation = f.Training.Description!,
            Category = f.Training.Category
        });

        return response;
    }

    public async Task MarkAsResolvedAsync(int feedbackId)
    {
        var feedback = await _dbContext.TrainingFeedbacks.FindAsync(feedbackId);

        if (feedback == null)
            throw new NotFoundException("Feedback não encontrado.");

        feedback.IsResolvedByAdmin = true;

        await _dbContext.SaveChangesAsync();
    }

    public async Task ReplyToFeedbackAsync(int feedbackId, FeedbackReplyRequest request)
    {
        var feedback = await _dbContext.TrainingFeedbacks.FindAsync(feedbackId);

        if (feedback == null)
            throw new NotFoundException("Feedback não encontrado.");

        feedback.AdminMessage = request.Message;
        feedback.IsResolvedByAdmin = true;

        await _dbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<FeedbackUserListResponse>> GetUserFeedbacksAsync(string userId, int page = 1, int pageSize = 5)
    {
        var feedbacks = await _dbContext.TrainingFeedbacks
            .AsNoTracking()
            .Include(f => f.Training)
            .Where(f =>
                f.Training.UserId == userId &&
                !f.IsAcknowledgedByUser &&
                !string.IsNullOrEmpty(f.AdminMessage))
            .OrderBy(f => f.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var response = feedbacks.Select(f => new FeedbackUserListResponse
        {
            FeedbackId = f.TrainingFeedbackId,
            Message = f.AdminMessage!,
            TrainingDate = f.Training.Date,
            Category = f.Training.Category
        });

        return response;
    }

    public async Task AcknowledgeFeedbackAsync(string userId, int feedbackId)
    {
        var feedback = await _dbContext.TrainingFeedbacks
            .Include(f => f.Training)
            .FirstOrDefaultAsync(f =>
                f.TrainingFeedbackId == feedbackId &&
                f.Training.UserId == userId);

        if (feedback == null)
            throw new NotFoundException("Feedback não encontrado.");

        feedback.IsAcknowledgedByUser = true;

        await _dbContext.SaveChangesAsync();
    }
}