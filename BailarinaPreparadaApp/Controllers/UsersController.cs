using BailarinaPreparadaApp.DTOs.Account;
using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/users")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{userId?}")]
        public async Task<IActionResult> GetUserDetails(string? userId = null)
        {
            var currentUserEmail = User.FindFirstValue(ClaimTypes.Email);
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var isAdmin = User.IsInRole("admin");

            var userDetails = await _userService.GetUserDetailsAsync(userId, currentUserEmail, currentUserId, isAdmin);
            
            return Ok(userDetails);
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> EditUser(string userId, [FromBody] EditUserRequest request)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var isAdmin = User.IsInRole("admin");

            var updatedUser = await _userService.EditUserAsync(userId, request, currentUserId, isAdmin);

            return Ok(updatedUser);
        }
    }
}
