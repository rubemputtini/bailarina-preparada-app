using BailarinaPreparadaApp.Data;
using BailarinaPreparadaApp.DTOs;
using BailarinaPreparadaApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private ApplicationDbContext _dbcontext;

        public UserController(UserManager<User> userManager, ApplicationDbContext dbcontext)
        {
            _userManager = userManager;
            _dbcontext = dbcontext;
        }

        [HttpGet("details/{userId?}")]
        public async Task<IActionResult> GetUserDetails(string? userId = null)
        {
            var currentUserId = userId ?? User.Identity!.Name;

            if (string.IsNullOrEmpty(currentUserId))
            {
                return BadRequest("ID do Usuário é inválido.");
            }
            var user = userId == null ? await _userManager.Users.FirstOrDefaultAsync(u => u.Email == User.Identity!.Name) : await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            var userDetails = new UserDetailsResponse
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email!,
                PhoneNumber = user.PhoneNumber,
                City = user.City,
                Country = user.Country         
            };

            return Ok(userDetails);
        }

        [HttpPut("edit-user/{userId}")]
        public async Task<IActionResult> EditUser(string userId, [FromBody] EditUserRequest request)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("ID do usuário não fornecido");
            }

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            user.Name = request.Name ?? user.Name;
            user.Email = request.Email ?? user.Email;
            user.UserName = request.Email ?? user.Email;
            user.PhoneNumber = request.PhoneNumber;
            user.Country = request.Country;
            user.City = request.City;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    message = "Não foi possível atualizar o usuário.",
                    details = result.Errors.Select(e => e.Description).ToList()
                });
            }

            await _dbcontext.SaveChangesAsync();

            var updatedUser = new UserResponse
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email!,
                PhoneNumber = user.PhoneNumber,
                Country = user.Country,
                City = user.City
            };

            return Ok(updatedUser);
        }
    }
}
