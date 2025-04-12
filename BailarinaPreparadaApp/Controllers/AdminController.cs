using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/admin")]
    [Authorize(Roles = "admin")]
    public class AdminController : BaseController
    {
        private readonly AdminService _adminService;

        public AdminController(AdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var (users, totalUsers) = await _adminService.GetUsersAsync(page, pageSize);

            if (!users.Any())
            {
                return NotFound(new { message = "Nenhum usuário encontrado." });
            }

            return Ok(new { users, totalUsers });
        }

        [HttpGet("users/{userId}/evaluations")]
        public async Task<IActionResult> GetUserEvaluations(string userId)
        {
            var evaluations = await _adminService.GetUserEvaluationsAsync(userId);

            if (!evaluations.Any())
            {
                return NotFound(new { message = "Nenhuma avaliação encontrada para o usuário." });
            }

            return Ok(evaluations);
        }

        [HttpGet("users/birthdays/recent")]
        public async Task<IActionResult> GetRecentBirthdays()
        {
            var birthdays = await _adminService.GetRecentBirthdaysAsync();

            if (!birthdays.Any())
            {
                return NotFound(new { message = "Nenhum aniversário encontrado." });
            }

            return Ok(birthdays);
        }
    }
}
