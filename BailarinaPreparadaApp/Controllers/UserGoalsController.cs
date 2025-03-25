using BailarinaPreparadaApp.DTOs.UserGoal;
using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/user-goals")]
    [Authorize]
    public class UserGoalsController : ControllerBase
    {
        private readonly UserGoalService _userGoalService;

        public UserGoalsController(UserGoalService userGoalService)
        {
            _userGoalService = userGoalService;
        }

        [HttpGet("me")]
        public async Task<ActionResult<List<UserGoalResponse>>> GetMyGoals()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest(new { message = "Usuário não encontrado." });
            }

            var goals = await _userGoalService.GetHistoricGoalsAsync(userId);

            return Ok(goals);
        }

        [HttpGet("me/{year:int}")]
        public async Task<ActionResult<UserGoalResponse>> GetMyGoalByYear(int year)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest(new { message = "Usuário não encontrado." });
            }

            var goal = await _userGoalService.GetGoalByYearAsync(userId, year);
            
            return Ok(goal);
        }

        [HttpPut("me")]
        public async Task<ActionResult<UserGoalResponse>> SetMyGoal([FromBody] SetUserGoalRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest(new { message = "Usuário não encontrado." });
            }
            
            var updatedGoal = await _userGoalService.SetUserGoalAsync(userId, request);
            
            return Ok(updatedGoal);
        }
    }
}
