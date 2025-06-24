using BailarinaPreparadaApp.Services.Achievements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers.Achievements
{
    [ApiController]
    [Route("api/v1/achievements")]
    [Authorize]
    public class AchievementsController : BaseController
    {
        private readonly IAchievementService _achievementService;

        public AchievementsController(IAchievementService achievementService)
        {
            _achievementService = achievementService;
        }

        [HttpGet]
        [Route("user")]
        public async Task<IActionResult> GetUserAchievements()
        {
            var achievements = await _achievementService.GetAchievementsForUserAsync(CurrentUserId);

            return Ok(achievements);
        }

        [HttpGet]
        [Route("user/{userId}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetUserAchievementsById(string userId)
        {
            var achievements = await _achievementService.GetAchievementsForUserAsync(userId);
            
            return Ok(achievements);
        }
    }
}
