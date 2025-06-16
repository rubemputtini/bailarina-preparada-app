using BailarinaPreparadaApp.DTOs.ActivityLinks;
using BailarinaPreparadaApp.Services.ActivityLinks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers.ActivityLinks
{
    [ApiController]
    [Route("api/v1/activity-links")]
    [Authorize(Roles = "admin")]
    public class ActivityLinksController : BaseController
    {
        private readonly IActivityLinkService _activityLinkService;

        public ActivityLinksController(IActivityLinkService activityLinkService)
        {
            _activityLinkService = activityLinkService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var activityLinks = await _activityLinkService.GetAllAsync();

            return Ok(activityLinks);
        }

        [HttpPost]
        public async Task<ActionResult<ActivityLinkResponse>> Create([FromBody] ActivityLinkRequest request)
        {
            var activityLink = await _activityLinkService.CreateAsync(request);

            return CreatedAtAction(nameof(GetAll), activityLink);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<ActivityLinkResponse>> Update(int id, [FromBody] ActivityLinkRequest request)
        {
            var activityLink = await _activityLinkService.UpdateAsync(id, request);

            return Ok(activityLink);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _activityLinkService.DeleteAsync(id);

            return Ok(new { message = "Treino sugerido excluído com sucesso." });
        }

        [HttpPost("{id:int}/toggle")]
        public async Task<IActionResult> ToggleStatus(int id)
        {
            var message = await _activityLinkService.ToggleStatusAsync(id);

            return Ok(new { message });
        }
    }
}
