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
        private readonly AchievementService _achievementService;

        public AchievementsController(AchievementService achievementService)
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
    }
}
