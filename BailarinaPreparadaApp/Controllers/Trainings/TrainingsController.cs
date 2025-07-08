using BailarinaPreparadaApp.DTOs.Trainings;
using BailarinaPreparadaApp.Services.Trainings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers.Trainings
{
    [ApiController]
    [Route("api/v1/trainings")]
    [Authorize]
    public class TrainingsController : BaseController
    {
        private readonly ITrainingService _trainingService;

        public TrainingsController(ITrainingService trainingService)
        {
            _trainingService = trainingService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTraining([FromBody] CreateTrainingRequest request)
        {
            await _trainingService.CreateTrainingAsync(CurrentUserId, request);

            return Ok(new { message = "Treino registrado com sucesso!" });
        }

        [HttpGet("completed")]
        public async Task<IActionResult> GetCompletedTrainingsByUser([FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate, [FromQuery] string? category)
        {
            var trainings = await _trainingService.GetCompletedTrainingsAsync(CurrentUserId, startDate, endDate, category);

            return Ok(trainings);
        }

        [HttpGet("yearly-days-count")]
        public async Task<IActionResult> GetYearlyTrainingDaysCount([FromQuery] int year)
        {
            var trainingDaysCount = await _trainingService.GetYearlyTrainingDaysCountAsync(CurrentUserId, year);

            return Ok(trainingDaysCount);
        }

        [HttpGet("by-date")]
        public async Task<IActionResult> GetTrainingsByDate([FromQuery] DateTime date)
        {
            var trainings = await _trainingService.GetTrainingsByDateAsync(CurrentUserId, date.Date);
            
            return Ok(trainings);
        }

        [HttpDelete("{trainingId:int}")]
        public async Task<IActionResult> DeleteTraining(int trainingId)
        {
            await _trainingService.DeleteTrainingAsync(CurrentUserId, trainingId);

            return Ok(new { message = "Treino excluído com sucesso!" });
        }
    }
}
