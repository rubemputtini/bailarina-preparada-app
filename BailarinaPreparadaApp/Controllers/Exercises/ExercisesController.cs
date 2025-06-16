using BailarinaPreparadaApp.Services.Exercises;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers.Exercises
{
    [ApiController]
    [Route("api/v1/exercises")]
    [Authorize(Roles = "admin")]
    public class ExercisesController : BaseController
    {
        private readonly IExerciseService _exerciseService;

        public ExercisesController(IExerciseService exerciseService)
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
