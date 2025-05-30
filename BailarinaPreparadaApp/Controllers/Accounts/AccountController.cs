using BailarinaPreparadaApp.DTOs.Accounts;
using BailarinaPreparadaApp.Services.Accounts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace BailarinaPreparadaApp.Controllers.Accounts
{
    [ApiController]
    [Route("api/v1/account")]
    public class AccountController : BaseController
    {       
        private readonly AccountService _accountService;

        public AccountController(AccountService accountService)
        {
            _accountService = accountService;
        }

        [EnableRateLimiting("LoginLimiter")]
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

        [EnableRateLimiting("LoginLimiter")]
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

        [EnableRateLimiting("LoginLimiter")]
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var (success, message) = await _accountService.ForgotPasswordAsync(request);

            if (!success)
            {
                return BadRequest(new { message });
            }

            return Ok(new { message });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            var (success, message) = await _accountService.ResetPasswordAsync(request);

            if (!success)
            {
                return BadRequest(new { message });
            }

            return Ok(new { message });
        }
    }
}
