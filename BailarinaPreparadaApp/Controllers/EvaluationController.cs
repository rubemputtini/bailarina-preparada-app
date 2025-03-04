using BailarinaPreparadaApp.DTOs.Evaluation;
using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class EvaluationController : ControllerBase
    {
        private readonly EvaluationService _evaluationService;

        public EvaluationController(EvaluationService evaluationService)
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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvaluationById(int id)
        {
            var evaluation = await _evaluationService.GetEvaluationByIdAsync(id);

            return Ok(evaluation);
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<IActionResult> CreateEvaluation([FromBody] CreateEvaluationRequest request)
        {
            var (success, message, evaluationId) = await _evaluationService.CreateEvaluationAsync(request);

            if (!success)
            {
                return BadRequest(new { message });
            }

            return CreatedAtAction(nameof(GetEvaluationById), new { id = evaluationId }, new { message, evaluationId });
        }

        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
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
        [HttpDelete("{id}")]
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
