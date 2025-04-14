using BailarinaPreparadaApp.DTOs.Announcements;
using BailarinaPreparadaApp.Services.Announcements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers.Announcements
{
    [ApiController]
    [Route("api/v1/announcements")]
    [Authorize]
    public class AnnouncementsController : BaseController
    {
        private readonly AnnouncementService _announcementService;

        public AnnouncementsController(AnnouncementService announcementService)
        {
            _announcementService = announcementService;
        }

        [HttpGet]
        public async Task<ActionResult<List<AnnouncementResponse>>> GetAnnouncements()
        {
            var announcements = await _announcementService.GetVisibleAnnouncementsAsync();

            return Ok(announcements);
        }

        [HttpGet("all")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<List<AnnouncementResponse>>> GetAllAnnouncements()
        {
            var announcements = await _announcementService.GetAllAnnouncementsAsync();

            return Ok(announcements);
        }

        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<AnnouncementResponse>> CreateAnnouncement([FromBody] CreateAnnouncementRequest request)
        {
            var created = await _announcementService.CreateAnnouncementAsync(CurrentUserId, request);

            return CreatedAtAction(nameof(GetAllAnnouncements), new { id = created.AnnouncementId }, created);
        }

        [HttpPatch("{id:int}/visibility")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> ToggleVisibility(int id, [FromQuery] bool isVisible)
        {
            var success = await _announcementService.ToggleVisibilityAsync(id, isVisible);

            if (!success)
            {
                return NotFound(new { message = "Aviso não encontrado." });
            }

            return Ok(new { message = "Visibilidade alterada com sucesso." });
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteAnnouncement(int id)
        {
            var success = await _announcementService.DeleteAnnouncementAsync(id);

            if (!success)
            {
                return NotFound(new { message = "Aviso não encontrado." });
            }

            return Ok(new { message = "Aviso excluído com sucesso." });
        }
    }
}
