﻿using BailarinaPreparadaApp.DTOs.Announcements;
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
        private readonly IAnnouncementService _announcementService;

        public AnnouncementsController(IAnnouncementService announcementService)
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
            await _announcementService.ToggleVisibilityAsync(id, isVisible);

            return Ok(new { message = "Visibilidade alterada com sucesso." });
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteAnnouncement(int id)
        {
            await _announcementService.DeleteAnnouncementAsync(id);

            return Ok(new { message = "Aviso excluído com sucesso." });
        }
    }
}
