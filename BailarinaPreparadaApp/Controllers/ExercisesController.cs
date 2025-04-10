using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/exercises")]
    [Authorize(Roles = "admin")]
    public class ExercisesController : BaseController
    {
        private readonly ExerciseService _exerciseService;

        public ExercisesController(ExerciseService exerciseService)
        {
            _exerciseService = exerciseService;
        }

        [HttpGet]
        public async Task<IActionResult> GetExercises()
        {
            var exercises = await _exerciseService.GetExercisesAsync();

            return Ok(exercises);
        }
    }
}
