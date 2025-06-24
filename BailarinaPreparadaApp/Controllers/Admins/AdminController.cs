using BailarinaPreparadaApp.Services.Admins;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers.Admins
{
    [ApiController]
    [Route("api/v1/admin")]
    [Authorize(Roles = "admin")]
    public class AdminController : BaseController
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers([FromQuery] int page = 1, [FromQuery] int pageSize = 10,
            [FromQuery] string? searchTerm = null)
        {
            var (users, totalUsers) = await _adminService.GetUsersAsync(page, pageSize, searchTerm);

            return Ok(new { users, totalUsers });
        }

        [HttpGet("users/{userId}/evaluations")]
        public async Task<IActionResult> GetUserEvaluations(string userId)
        {
            var evaluations = await _adminService.GetUserEvaluationsAsync(userId);

            return Ok(evaluations);
        }

        [HttpGet("users/birthdays/recent")]
        public async Task<IActionResult> GetRecentBirthdays()
        {
            var birthdays = await _adminService.GetRecentBirthdaysAsync();

            return Ok(birthdays);
        }
    }
}