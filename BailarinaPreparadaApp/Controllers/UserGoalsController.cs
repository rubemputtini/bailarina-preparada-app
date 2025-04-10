using BailarinaPreparadaApp.DTOs.UserGoal;
using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/user-goals")]
    [Authorize]
    public class UserGoalsController : BaseController
    {
        private readonly UserGoalService _userGoalService;

        public UserGoalsController(UserGoalService userGoalService)
        {
            _userGoalService = userGoalService;
        }

        [HttpGet("me")]
        public async Task<ActionResult<List<UserGoalResponse>>> GetMyGoals()
        {
            var goals = await _userGoalService.GetHistoricGoalsAsync(CurrentUserId);

            return Ok(goals);
        }

        [HttpGet("me/{year:int}")]
        public async Task<ActionResult<UserGoalResponse>> GetMyGoalByYear(int year)
        {
            var goal = await _userGoalService.GetGoalByYearAsync(CurrentUserId, year);
            
            return Ok(goal);
        }

        [HttpPut("me")]
        public async Task<ActionResult<UserGoalResponse>> SetMyGoal([FromBody] SetUserGoalRequest request)
        {
            var updatedGoal = await _userGoalService.SetUserGoalAsync(CurrentUserId, request);
            
            return Ok(updatedGoal);
        }
    }
}
