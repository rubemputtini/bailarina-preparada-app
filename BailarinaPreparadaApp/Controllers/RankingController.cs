using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    [Authorize]
    public class RankingController : ControllerBase
    {
        private readonly RankingService _rankingService;

        public RankingController(RankingService rankingService)
        {
            _rankingService = rankingService;
        }

        [HttpGet]
        public async Task<IActionResult> GetRanking([FromQuery] int? month, int? year)
        {
            var ranking = await _rankingService.GetRankingAsync(month, year);

            return Ok(ranking);
        }

        [HttpGet("top5")]
        public async Task<IActionResult> GetTop5Ranking([FromQuery] int? month, int? year)
        {
            var ranking = await _rankingService.GetRankingAsync(month, year);

            return Ok(ranking.Take(5));
        }
    }
}
