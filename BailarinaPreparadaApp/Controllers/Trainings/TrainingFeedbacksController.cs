using BailarinaPreparadaApp.DTOs.Trainings;
using BailarinaPreparadaApp.Services.Trainings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers.Trainings;

[ApiController]
[Route("api/v1/trainings/feedbacks")]
[Authorize]
public class TrainingFeedbacksController : BaseController
{
    private readonly ITrainingFeedbackService _feedbackService;

    public TrainingFeedbacksController(ITrainingFeedbackService feedbackService)
    {
        _feedbackService = feedbackService;
    }

    [HttpGet]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<IEnumerable<FeedbackAdminListResponse>>> GetPendingFeedbacks(
        [FromQuery] int page = 1, 
        [FromQuery] int pageSize = 10, 
        [FromQuery] string? searchTerm = null,
        [FromQuery] string? category = null)
    {
        var (feedbacks, totalFeedbacks) =
            await _feedbackService.GetPendingFeedbacksAsync(page, pageSize, searchTerm, category);

        return Ok(new { feedbacks, totalFeedbacks });
    }

    [HttpPost("{feedbackId:int}/resolve")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> MarkAsResolved(int feedbackId)
    {
        await _feedbackService.MarkAsResolvedAsync(feedbackId);

        return Ok(new { message = "Feedback resolvido com sucesso." });
    }

    [HttpPost("{feedbackId:int}/reply")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> ReplyToFeedback(int feedbackId, [FromBody] FeedbackReplyRequest request)
    {
        await _feedbackService.ReplyToFeedbackAsync(feedbackId, request);

        return Ok(new { message = "Feedback enviado com sucesso." });
    }

    [HttpGet("me")]
    public async Task<ActionResult<IEnumerable<FeedbackUserListResponse>>> GetMyFeedbacks(
        [FromQuery] int page = 1, [FromQuery] int pageSize = 5)
    {
        var feedbacks = await _feedbackService.GetUserFeedbacksAsync(CurrentUserId, page, pageSize);

        return Ok(feedbacks);
    }

    [HttpPost("me/{feedbackId:int}/acknowledge")]
    public async Task<IActionResult> AcknowledgeFeedback(int feedbackId)
    {
        await _feedbackService.AcknowledgeFeedbackAsync(CurrentUserId, feedbackId);

        return Ok(new { message = "Feedback marcado como lido." });
    }
}