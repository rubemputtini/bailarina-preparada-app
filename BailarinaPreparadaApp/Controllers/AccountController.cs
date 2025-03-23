using BailarinaPreparadaApp.DTOs.Account;
using BailarinaPreparadaApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BailarinaPreparadaApp.Controllers
{
    [ApiController]
    [Route("api/v1/account")]
    public class AccountController : ControllerBase
    {       
        private readonly AccountService _accountService;

        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await _accountService.LoginAsync(request);

            if (response == null)
            {
                return Unauthorized(new { message = "E-mail ou senha inválidos." });
            }

            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var (success, message, token) = await _accountService.RegisterAsync(request);

            if (!success)
            {
                return BadRequest(new { message });
            }

            return Ok(new { message, token });
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("user")]
        public async Task<IActionResult> DeleteUser([FromBody] DeleteUserRequest request)
        {
            var (success, message) = await _accountService.DeleteUserAsync(request);

            if (!success)
            {
                return BadRequest(new { message });
            }

            return Ok(new { message });
        }
    }
}
