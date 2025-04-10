using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/ranking")]
    [Authorize]
    public class RankingController : BaseController
    {
        private readonly RankingService _rankingService;

        public RankingController(RankingService rankingService)
        {
            _rankingService = rankingService;
        }

        [HttpGet]
        public async Task<IActionResult> GetRanking([FromQuery] int? month, [FromQuery] int? year, [FromQuery] int? limit)
        {
            var ranking = await _rankingService.GetRankingAsync(month, year, limit);

            return Ok(ranking);
        }
    }
}
