using BailarinaPreparadaApp.DTOs.Evaluations;
using BailarinaPreparadaApp.Services.Evaluations;
using BailarinaPreparadaApp.Services.Schedules;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers.Evaluations
{
    [ApiController]
    [Route("api/v1/evaluations")]
    [Authorize]
    public class EvaluationsController : BaseController
    {
        private readonly EvaluationService _evaluationService;

        public EvaluationsController(EvaluationService evaluationService)
        {
            _evaluationService = evaluationService;
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<IActionResult> GetEvaluations()
        {
            var evaluations = await _evaluationService.GetEvaluationsAsync();

            return Ok(evaluations);
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetMyEvaluations()
        {           
            var evaluations = await _evaluationService.GetEvaluationsByUserIdAsync(CurrentUserId);

            return Ok(evaluations);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetEvaluationById(int id)
        {
            var evaluation = await _evaluationService.GetEvaluationByIdAsync(id, CurrentUserId, IsAdmin);

            return Ok(evaluation);
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<IActionResult> CreateEvaluation([FromBody] CreateEvaluationRequest request)
        {
            var (success, message, evaluationId) = await _evaluationService.CreateEvaluationAsync(request);

            if (!success)
            {
                return NotFound(new { message });
            }

            return CreatedAtAction(nameof(GetEvaluationById), new { id = evaluationId }, new { message, evaluationId });
        }

        [Authorize(Roles = "admin")]
        [HttpPost("{evaluationId:int}/send-evaluation-email")]
        public async Task<IActionResult> SendEvaluationEmail(int evaluationId)
        {
            await _evaluationService.SendEvaluationReadyEmailAsync(evaluationId);

            return Ok(new { message = "E-mail de avaliação enviado com sucesso!" });
        }

        [Authorize(Roles = "admin")]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateEvaluation(int id, [FromBody] List<EvaluationExerciseRequest> updatedExercises)
        {
            var (success, message) = await _evaluationService.UpdateEvaluationAsync(id, updatedExercises);

            if (!success)
            {
                return BadRequest(new { message });
            }

            return Ok(new { message });
        }

        [Authorize(Roles = "admin")]
        [HttpPatch("{id:int}/photos")]
        public async Task<IActionResult> UpdatePhotosUrl(int id, [FromBody] EvaluationPhotoUrlRequest request)
        {
            var (success, message) = await _evaluationService.UpdatePhotosUrlAsync(id, request.PhotosUrl);

            if (!success)
            {
                return NotFound(new { message });
            }

            return Ok(new { message });
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteEvaluation(int id)
        {
            var (success, message) = await _evaluationService.DeleteEvaluationAsync(id);

            if (!success)
            {
                return NotFound(new { message });
            }

            return Ok(new { message });
        }
    }
}
