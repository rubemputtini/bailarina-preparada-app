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
    }
}
