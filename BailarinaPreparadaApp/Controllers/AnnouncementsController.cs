using BailarinaPreparadaApp.DTOs.Announcement;
using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/announcements")]
    [Authorize]
    public class AnnouncementsController : ControllerBase
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
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest(new { message = "Usuário não encontrado." });
            }

            var created = await _announcementService.CreateAnnouncementAsync(userId, request);

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
