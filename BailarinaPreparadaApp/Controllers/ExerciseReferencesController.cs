using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/exercise-references")]
    [Authorize]
    public class ExerciseReferencesController : BaseController
    {
        private readonly ExerciseReferenceService _exerciseReferenceService;

        public ExerciseReferencesController(ExerciseReferenceService exerciseReferenceService)
        {
            _exerciseReferenceService = exerciseReferenceService;
        }

        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetAllReferences()
        {
            var references = await _exerciseReferenceService.GetAllReferencesAsync();

            return Ok(references);
        }

        [HttpGet("{exerciseId}")]
        public async Task<IActionResult> GetByExerciseId(int exerciseId)
        {
            var references = await _exerciseReferenceService.GetByExerciseIdAsync(exerciseId);

            return Ok(references);
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetClassificationForUser(
            [FromQuery] int exerciseId,
            [FromQuery] int age, 
            [FromQuery] string gender,
            [FromQuery] int score)
        {
            if (string.IsNullOrWhiteSpace(gender))
            {
                return BadRequest(new { message = "O gênero é obrigatório." });
            }

            var reference = await _exerciseReferenceService.GetClassificationForUserAsync(exerciseId, age, gender, score);

            if (reference == null)
            {
                throw new NotFoundException("Nenhuma faixa de referência encontrada para esse exercício, idade e gênero.");
            }

            return Ok(reference);
        }
    }
}
