using BailarinaPreparadaApp.DTOs.Training;
using BailarinaPreparadaApp.Exceptions;
using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/trainings")]
    [Authorize]
    public class TrainingsController : ControllerBase
    {
        private readonly TrainingService _trainingService;

        public TrainingsController(TrainingService trainingService)
        {
            _trainingService = trainingService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTraining([FromBody] CreateTrainingRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                throw new UnauthorizedException("Usuário não autenticado.");
            }

            await _trainingService.CreateTrainingAsync(userId, request);

            return Ok(new { message = "Treino registrado com sucesso!" });
        }

        [HttpGet("completed")]
        public async Task<IActionResult> GetCompletedTrainingsByUser([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate, [FromQuery] string? category)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                throw new UnauthorizedException("Usuário não autenticado.");
            }

            var trainings = await _trainingService.GetCompletedTrainingsAsync(userId, startDate, endDate, category);

            return Ok(trainings);
        }

        [HttpGet("yearly-days-count")]
        public async Task<IActionResult> GetYearlyTrainingDaysCount([FromQuery] int year)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                throw new UnauthorizedException("Usuário não autenticado.");
            }

            var trainingDaysCount = await _trainingService.GetYearlyTrainingDaysCountAsync(userId, year);

            return Ok(trainingDaysCount);
        }

        [HttpDelete("{trainingId}")]
        public async Task<IActionResult> DeleteTraining(int trainingId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                throw new UnauthorizedException("Usuário não autenticado.");
            }

            await _trainingService.DeleteTrainingAsync(userId, trainingId);

            return Ok(new { message = "Treino excluído com sucesso!" });
        }
    }
}
