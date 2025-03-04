using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Roles = "admin")]
    public class AdminController : ControllerBase
    {
        private readonly AdminService _adminService;

        public AdminController(AdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _adminService.GetUsersAsync();

            return Ok(users);
        }

        [HttpGet("user-evaluations/{userId}")]
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
