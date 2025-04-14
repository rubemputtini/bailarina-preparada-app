using BailarinaPreparadaApp.DTOs.Accounts;
using BailarinaPreparadaApp.Services.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers.Users
{
    [ApiController]
    [Route("api/v1/users")]
    [Authorize]
    public class UsersController : BaseController
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{userId?}")]
        public async Task<IActionResult> GetUserDetails(string? userId = null)
        {
            var userDetails = await _userService.GetUserDetailsAsync(userId, CurrentUserEmail, CurrentUserId, IsAdmin);
            
            return Ok(userDetails);
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> EditUser(string userId, [FromBody] EditUserRequest request)
        {
            var updatedUser = await _userService.EditUserAsync(userId, request, CurrentUserId, IsAdmin);

            return Ok(updatedUser);
        }
    }
}
